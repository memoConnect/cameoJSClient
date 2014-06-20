'use strict';

angular.module('cmSecurityAspects')
.factory('cmSecurityAspectsConversation',[
    'cmSecurityAspects',
    function(cmSecurityAspects){
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
                        console.log('ENCRYPTED', conversation.id,  conversation.isEncrypted())
                        return conversation.isEncrypted();
                    }
                })
                .addAspect({
                    id: 'RECIPIENTS_WITH_KEY',
                    value: 3,
                    check: function(conversation){
                        var bool = true,
                            count = 0;
                        angular.forEach(conversation.recipients, function(recipient){
                            if(recipient.getWeakestKeySize() < 1000) {
                                bool = false;
                                count++;
                            }
                        });

                        if(count>0){
                            this.stateVars.count = count;
                        } else {
                            this.stateVars = {};
                        }
                        return bool;
                    }
                })
                .addAspect({
                    id: 'RECIPIENTS_WITHOUT_KEY',
                    value: -1,
                    check: function(conversation){
                        var bool = false,
                            count = 0;
                        angular.forEach(conversation.recipients, function(recipient){
                            if(recipient.getWeakestKeySize() == 0) {
                                bool = true;
                                count++;
                            }
                        });

                        if(count>0){
                            this.stateVars.count = count;
                        } else {
                            this.stateVars = {};
                        }
                        return bool;
                    }
                })
                .addAspect({
                    id: 'HAS_PASSCAPTCHA',
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

            return self;
        }

        return securityAspectsConversation 
    }
])