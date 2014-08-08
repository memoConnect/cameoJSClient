'use strict';

angular.module('cmContacts').directive('cmContactTag',[

    'cmUserModel',

    function (cmUserModel){
        return {
            restrict: 'AE',
            require: '^cmContactsList',
            priority: 2,
            controller: function($scope, $element, $attrs){
                            $scope.isTrusted = function(contact){
                                return      contact.identity 
                                        &&  contact.identity.keys
                                        &&  contact.identity.keys.length > 0 
                                        &&  cmUserModel.verifyTrust(contact.identity)
                            }
                        }
        }
    }
]);