'use strict';

angular.module('cmRouteSettings').directive('cmIdentityKeysOverview', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-identity-keys-overview.html',
            controller: function ($scope) {
                $scope.ownKeys = (cmUserModel.data.identity.keys && cmUserModel.data.identity.keys) || [];

                $scope.remove = function(key){
                    cmUserModel.removeKey(key);
                };
            }
        }
    }
]);