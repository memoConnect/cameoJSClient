'use strict';

angular.module('cmSecurityAspects')
.service('cmSecurityAspectsConversation',[

    'cmSecurityAspects',

    function(cmSecurityAspects){
        var securityAspectsConversation = new cmSecurityAspects()

        securityAspectsConversation
        .addAspect({
            id:             'NOT_ENCRYPTED',
            value:          -2,
            check:          function(conversation){
                                return true
                            }
        })

        return securityAspectsConversation 
    }
])