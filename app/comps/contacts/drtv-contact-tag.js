'use strict';

angular.module('cmContacts').directive('cmContactTag',[

    'cmUserModel',

    function (cmUserModel){
        return {
            restrict: 'AE',
            require: '^cmContactsList',
            priority: 2,

            controller: function($scope, $element, $attrs){
                $scope.startAuthentication = function(identity){
                    cmUserModel.trigger('handshake:start', {key: identity.keys[0], identity: identity});
                };
            }
        }
    }
]);