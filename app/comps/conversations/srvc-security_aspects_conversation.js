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
                    id: 'RECIPIENTS_WITH_PROPER_KEYS',
                    dependencies: ['ENCRYPTED'],
                    value: 3,
                    check: function(conversation){
                        return conversation.recipients.every(function(recipient){
                            return recipient.getWeakestKeySize() > 2000
                        })

                        /*
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
                        */
                    }
                })
                .addAspect({
                    id: 'RECIPIENTS_WITHOUT_PROPER_KEYS',
                    value: -1,
                    dependencies: ['ENCRYPTED'],
                    check: function(conversation){
                        this.bad_recipients = conversation.recipients.filter(function(recipient){
                            return recipient.getWeakestKeySize() <= 2000
                        })

                        this.bad_recipients_list = this.bad_recipients.map(function(recipient){ return recipient.getDisplayName() }).join(', ')

                        return this.bad_recipients.length != 0
                        /*
                        var bool = false,
                            count = 0,
                            recipients = [];
                        angular.forEach(conversation.recipients, function(recipient){
                            if(recipient.getWeakestKeySize() == 0) {
                                bool = true;
                                recipients.push(recipient.getDisplayName());
                                count++;
                            }
                        });

                        if(count>0){
                            this.stateVars.count = count;
                            this.stateVars.recipients = recipients.join(', ');
                        } else {
                            this.stateVars = {};
                        }
                        return bool;
                        */
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