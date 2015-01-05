'use strict';

angular.module('cmContacts')
.factory('cmSecurityAspectsContact',[

    'cmSecurityAspects',
    'cmUserModel',
    '$q',

    function(cmSecurityAspects, cmUserModel, $q){
//        var securityAspectsConversation = new cmSecurityAspects()

        function securityAspectsContact(contact){
            var self = new cmSecurityAspects( {languagePrefix: 'SECURITY_ASPECT.CONTACT'} )

            self
            .setTarget(contact)

            self
                .addAspect({
                    id: 'NO_KEY',
                    value: -1,
                    check: function(contact){
                        return contact.identity.keys.length == 0
                    },
                    toggleCheck: function(contact){
                        return false
                    },
                    toggleCall: function(contact){
                        
                    }
                })
                .addAspect({
                    id: 'AT_LEAST_ONE_KEY',
                    value: 1,
                    check: function(contact){
                        return contact.identity.keys.length > 0
                    },
                    toggleCheck: function(contact){
                        return false
                    },
                    toggleCall: function(contact){
                        
                    }
                })
                .addAspect({
                    id: 'AT_LEAST_ONE_AUTHENTICATED_KEY',
                    value: 1,
                    check: function(contact){
                        return  cmUserModel.verifyIdentityKeys(contact.identity)
                                .then(function(ttrusted_keys){
                                    return  ttrusted_keys.length > 0                                             
                                })
                    },
                    toggleCheck: function(contact){
                        return false
                    },
                    toggleCall: function(contact){
                        
                    }
                });

                cmUserModel.on('update:finished', self.scheduleRefresh)

            return self;
        }

        return securityAspectsContact
    }
])