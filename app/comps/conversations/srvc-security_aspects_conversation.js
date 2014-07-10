'use strict';

angular.module('cmSecurityAspects')
.factory('cmSecurityAspectsConversation',[
    'cmSecurityAspects',
    'cmUserModel',
    function(cmSecurityAspects, cmUserModel){
//        var securityAspectsConversation = new cmSecurityAspects()

        function securityAspectsConversation(target){
            var self = new cmSecurityAspects();

            self.setTarget(target);

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
                    id: 'SE_PASSPHRASE_PRESENT',
                    dependencies: ['ENCRYPTED'],
                    value: -1,
                    check: function(conversation){
                        this.bad_recipients = conversation.recipients.filter(function(recipient){
                            return recipient.getWeakestKeySize() <= 2000
                        })

                        this.bad_recipients_list = this.bad_recipients.map(function(recipient){ return recipient.getDisplayName() }).join(', ')

                        return ['symmetrical', 'mixed'].indexOf(conversation.exportData().keyTransmission) != -1;
                    },
                })                
                .addAspect({
                    id: 'HAS_PASSCAPTCHA',
                    dependencies: ['SE_PASSPHRASE_PRESENT'],
                    value: -2,
                    check: function(conversation){
                        var bool = false;

                        if(conversation.options.hasCaptcha !== false){
                            bool = true
                        }

                        return bool;
                    },
                    toggleCheck: function(conversation){
                        return conversation.options.hasCaptcha !== false
                    },
                    toggleCall: function(conversation){
                        conversation.disablePassCaptcha();
                    }
                })                             
                .addAspect({
                    id: 'NO_SE_PASSPHRASE_PRESENT',
                    dependencies: ['ENCRYPTED'],
                    value: +1,
                    check: function(conversation){
                        return !['symmetrical', 'mixed'].indexOf(conversation.exportData().keyTransmission) != -1;
                    },
                })   

            return self;
        }

        return securityAspectsConversation 
    }
])