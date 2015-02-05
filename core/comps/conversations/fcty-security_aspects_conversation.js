'use strict';

angular.module('cmConversations')
.factory('cmSecurityAspectsConversation',[

    'cmSecurityAspects',
    'cmUserModel',
    'cmIdentityFactory',
    '$q',

    function(cmSecurityAspects, cmUserModel, cmIdentityFactory, $q){
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
                    id: 'AUTHENTIC_RECIPIENTS',
                    dependencies: ['ENCRYPTED', 'NO_SYMMETRIC_KEY_TRANSMISSION'],
                    value: 1,
                    check: function(){
                        return  conversation.state.is('new')
                                &&
                                conversation.recipients.reduce(function(so_far, recipient){
                                    return  so_far
                                            .then(function(){
                                                return  cmUserModel.verifyIdentityKeys(recipient, true)
                                            })
                                            .then(function(ttrusted_keys){
                                                return  ttrusted_keys.length == recipient.keys.length
                                                        ?   $q.when(true)
                                                        :   $q.reject()
                                            })
                                }, $q.when())
                                .then(
                                    function(){ return true },
                                    function(){ return false }
                                )
                    }
                })
                .addAspect({
                    id: 'AUTHENTIC_RECIPIENT_LIST',
                    dependencies: ['ENCRYPTED', 'NO_SYMMETRIC_KEY_TRANSMISSION'],
                    value: 1,
                    template:    '<div>{{aspect.description|cmTranslate}}</div><br/>'
                                +'<div ng-repeat ="recipient in aspect.recipients">{{recipient.displayName}} ({{recipient.cameoId}})</div>',
                    check: function(conversation){
                        var self = this

                        return  !conversation.state.is('new')
                                &&
                                conversation.verifyAuthenticity()
                                .then(function(recipientKeyList){
                                        //console.log('Aspekt recipientKeyList', recipientKeyList)


                                    self.recipients = recipientKeyList.map(function(item){
                                                            return cmIdentityFactory.find(item.identityId)
                                                        })
                                    return  recipientKeyList.reduce(function(so_far, item){
                                                return  so_far
                                                        .then(function(reason){
                                                            var identity = cmIdentityFactory.create(item.identityId)
                                                            //console.log('identity', identity)
                                                            return  cmUserModel.verifyIdentityKeys(identity, false, true)
                                                        })
                                                        .then(function(ttrusted_keys){
                                                            return  item.keys.every(function(key){
                                                                        return ttrusted_keys.some(function(tt_key){
                                                                            return tt_key.id == key.id
                                                                        })
                                                                    })
                                                                    ?   $q.when(true)
                                                                    :   $q.reject('unauthentic key in recipient key list')
                                                        })
                                            }, $q.when(false))
                                })
                                .then(
                                    function(){ return true },
                                    function(){ return false }
                                )


                        if(conversation.inactiveRecipients.length > 0){
                            var r = conversation.recipients.concat(conversation.inactiveRecipients)
                        } else {
                            var r = conversation.recipients;
                        }

                        //temporary solution, AP

                        return  r.length < 3
                            ?   r.reduce(function(so_far, recipient){
                                    return  so_far
                                            .then(function(){
                                                return  cmUserModel.verifyIdentityKeys(recipient, true)
                                            })
                                            .then(function(ttrusted_keys){
                                                return  ttrusted_keys.length == recipient.keys.length
                                                        ?   $q.when(true)
                                                        :   $q.reject()
                                            })

                                }, $q.when())
                                .then(
                                    function(){ return true },
                                    function(){ return false }
                                )
                            :   $q.when(false)
                    }
                });

            

            conversation.on('update:finished encryption:enabled encryption:disabled captcha:enabled captcha:disabled aspects:added decrypt:success', self.scheduleRefresh);
            conversation.recipients.on('register update:finished deregister', self.scheduleRefresh);
            cmUserModel.on('key:stored key:removed cache:updated', self.scheduleRefresh);


            return self;
        }

        return securityAspectsConversation 
    }
])