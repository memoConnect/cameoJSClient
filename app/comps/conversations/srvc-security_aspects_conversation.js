'use strict';

angular.module('cmSecurityAspects')
.factory('cmSecurityAspectsConversation',[

    'cmSecurityAspects',
    'cmUserModel',

    function(cmSecurityAspects, cmUserModel){
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
                    template:       '<div ng-if="isNew">{{aspect.description+"_NEW"|cmTranslate}}</div>'
                                +   '<div ng-if="!isNew">{{aspect.description|cmTranslate}}</div>'
                                +   '{{aspect.description+"_BAD_RECIPIENTS"|cmTranslate}}<div ng-if = "aspect.numberOfBadRecipients > 0">{{aspect.badRecipients.join(", ")}}</div>'
                                +   '<div ng-if = "aspect.privateKeyMissing">{{aspect.description+"_PRIVATE_KEY_MISSING"|cmTranslate}}</div>',
                    check: function(conversation){

                        this.badRecipients          = conversation.getBadRecipients().map(function(recipient){
                                                            return recipient.getDisplayName()
                                                        })
                        this.numberOfBadRecipients  = this.badRecipients.length
                        this.privateKeyMissing      = !conversation.userHasPrivateKey()

                        this.isNew                  = conversation.state.is('new')

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
                        return conversation.options.hasCaptcha
                    },
                    toggleCall: function(conversation){
                        conversation.disablePassCaptcha();
                    }
                }) 
                .addAspect({                    
                    id: 'NO_SYMMETRIC_KEY_TRANSMISSION',
                    dependencies: ['ENCRYPTED'],
                    value: 1,
                    check: function(conversation){
                        return ['symmetric', 'mixed'].indexOf(conversation.getKeyTransmission()) == -1
                    }
                })
                .addAspect({
                    id: 'TRUSTING_ALL_RECIPIENTS',
                    dependencies: ['ENCRYPTED', 'NO_SYMMETRIC_KEY_TRANSMISSION'],
                    value: 1,
                    check: function(conversation){
                        /**
                         * @todo work around hack from BB 19.09.2014
                         */
                        if(conversation.recipients.length < 3){
                            this.bad_recipients = conversation.recipients.filter(function(recipient){
                                return !cmUserModel.verifyTrust(recipient)
                            })
                        } else {
                            this.bad_recipients = conversation.recipients.length;
                        }

                        return this.bad_recipients.length == 0;
                    }
                });

            return self;
        }

        return securityAspectsConversation 
    }
])