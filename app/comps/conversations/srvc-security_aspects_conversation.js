'use strict';

angular.module('cmSecurityAspects')
.factory('cmSecurityAspectsConversation',[
    'cmSecurityAspects',
    function(cmSecurityAspects){
        var securityAspectsConversation = new cmSecurityAspects()

        securityAspectsConversation
        .addAspect({
            id:             'NOT_ENCRYPTED',
            value:          -3,
            check:          function(conversation){
                                return conversation.getKeyTransmission() == 'none'
                            },

            toggleCheck:    function(conversation){
                                return conversation.state.is('new')
                            },

            toggleCall:     function(conversation){
                                conversation.enableEncryption()
                            }
        })

        .addAspect({
            id:             'ENCRYPTED',
            value:          1,
            check:          function(conversation){
                                return false
                            }
        })
        .addAspect({
            id:             'TEST1',
            value:          1,
            check:          function(conversation){
                                return true
                            }
        })
        .addAspect({
            id:             'TEST2',
            value:          2,
            check:          function(conversation){
                                return true
                            }
        })
        .addAspect({
            id:             'TEST3',
            value:          -1,
            check:          function(conversation){
                                return true
                            }
        })
        .addAspect({
            id:             'TEST4',
            value:          -1,
            check:          function(conversation){
                                return true
                            }
        })
        .addAspect({
            id:             'TEST5',
            value:          1,
            check:          function(conversation){
                                return true
                            }
        })

        return securityAspectsConversation 
    }
])