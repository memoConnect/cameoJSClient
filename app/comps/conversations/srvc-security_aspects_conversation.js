'use strict';

angular.module('cmSecurityAspects')
.factory('cmSecurityAspectsConversation',[
    'cmSecurityAspects',
    function(cmSecurityAspects){
//        var securityAspectsConversation = new cmSecurityAspects()

        function securityAspectsConversation(conversation){
            var self                = new cmSecurityAspects( {languagePrefix: 'SECURITY_ASPECT.CONVERSATION'} )

            self
            .setTarget(conversation)

            self
                .addAspect({
                    id: 'NOT_ENCRYPTED',
                    value: -3,
                    check: function(conversation){
                        return !conversation.isEncrypted();
                    },
                    toggleCheck: function(conversation){
                        return !conversation.isEncrypted();
                    },
                    toggleCall: function(conversation){
                        conversation.enableEncryption();
                    }
                })
                .addAspect({
                    id: 'ENCRYPTED',
                    value: 1,
                    check: function(conversation){
                        return conversation.isEncrypted();
                    }
                })    
                .addAspect({
                    id: 'KEY_TRANSMISSION_SYMMETRIC',
                    dependencies: ['ENCRYPTED'],
                    value: -1,
                    template: '     <div>{{aspect.description|cmTranslate}}</div>'
                                +   '{{aspect.description+"_BAD_RECIPIENTS"|cmTranslate}}<div ng-if = "aspect.numberOfBadRecipients > 0">{{aspect.badRecipients.join(", ")}}</div>'
                                +   '<div ng-if = "aspect.privateKeyMissing">{{aspect.description+"_PRIVATE_KEY_MISSING"|cmTranslate}}</div>',
                    check: function(conversation){

                        this.badRecipients          = conversation.getBadRecipients().map(function(recipient){
                                                            return recipient.getDisplayName()
                                                        })
                        this.numberOfBadRecipients  = this.badRecipients.length
                        this.privateKeyMissing      = !conversation.userHasPrivateKey()

                        /**
                         * @TODO
                         * BS mit Andreas absprechen
                         * passwordRequired hat unterschiedleiche Bedeutungen??!
                         */
//                        if(conversation.state.is('new')){
//                            return conversation.passwordRequired()
//                        } else {
//                            return conversation.hasPassword();
//                        }

                        return ['symmetric', 'mixed'].indexOf(conversation.getKeyTransmission()) != -1;
                    }
                })
                .addAspect({
                    id: 'HAS_PASSCAPTCHA',
                    dependencies: ['KEY_TRANSMISSION_SYMMETRIC'],
                    value: -1,
                    check: function(conversation){
                        return conversation.options.hasCaptcha;
                    },
                    toggleCheck: function(conversation){
                        return !conversation.options.hasCaptcha
                    },
                    toggleCall: function(conversation){
                        conversation.disablePassCaptcha();
                    }
                }) 
                .addAspect({                    
                    id: 'ALL_RECIPIENTS_HAVE_PROPER_KEYS',
                    dependencies: ['ENCRYPTED'],
                    value: 1,
                    check: function(conversation){
                        return      conversation.state.is('new') 
                                &&  !conversation.passwordRequired()            
                    }
                })   
                .addAspect({                    
                    id: 'NO_SYMMETRIC_KEY_TRANSMISSION',
                    dependencies: ['ENCRYPTED'],
                    value: 1,
                    check: function(conversation){
                        return      !conversation.state.is('new') 
                                &&  ['symmetric', 'mixed'].indexOf(conversation.getKeyTransmission()) == -1
                    }
                }) 

            return self;
        }

        return securityAspectsConversation 
    }
])