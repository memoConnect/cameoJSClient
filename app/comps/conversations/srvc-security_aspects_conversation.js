'use strict';

angular.module('cmSecurityAspects')
.factory('cmSecurityAspectsConversation',[
    'cmSecurityAspects',
    function(cmSecurityAspects){
        var securityAspectsConversation = new cmSecurityAspects()

        securityAspectsConversation
        .addAspect({
            id: 'NOT_ENCRYPTED',
            value: -3,
            check: function(conversation){
                return conversation.getKeyTransmission() == 'none';
            },
            toggleCheck: function(conversation){
                return conversation.state.is('new');
            },
            toggleCall: function(conversation){
                conversation.enableEncryption();
            }
        })
        .addAspect({
            id: 'ENCRYPTED',
            value: 1,
            check: function(conversation){
                return conversation.getKeyTransmission() != 'none';
            }
        })
        .addAspect({
            id: 'RECIPIENTS_WITH_KEY',
            value: 1,
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

        return securityAspectsConversation 
    }
])