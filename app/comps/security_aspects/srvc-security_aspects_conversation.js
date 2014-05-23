'use strict';

angular.module('cmSecurityAspects')
.service('cmSecurityAspectsConversation',[

    'cmSecurityAspects'

    function(cmSecurityAspects){
        var securityAspectsConversation = new cmSecurityAspects()

        securityAspectsConversation
        .add({
            name:           'SECURITY_ASPECT.CONVERSATION.NOT_ENCRYPTED.NAME',
            description:    'SECURITY_ASPECT.CONVERSATION.NOT_ENCRYPTED.DESCRIPTION',
            value:          -2
            check:          function(){
                                return value
                            }
        })

        return securityAspectsConversation 
    }
]