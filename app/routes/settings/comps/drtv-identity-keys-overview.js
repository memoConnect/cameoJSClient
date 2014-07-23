'use strict';

angular.module('cmRouteSettings')
.directive('cmIdentityKeysOverview', [
    'cmUserModel',
    'cmModal',
    function(cmUserModel, cmModal){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-identity-keys-overview.html',
            controller: function ($scope) {
                //Todo: identity.keys oder cmUserModel.getLocalKeys() ?
                //$scope.ownKeys = cmUserModel.data.identity.keys || [];
                $scope.ownKeys = cmUserModel.loadLocalKeys() || [];

                $scope.remove = function(key){
                    cmUserModel.removeKey(key);
                    cmModal.closeAll();
                };

                $scope.isTrustedKey = function(key){
                    return cmUserModel.trustsKey(key)
                }
            }
        }
    }
]);