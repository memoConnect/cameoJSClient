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
                $scope.privateKeys  = cmUserModel.loadLocalKeys() || [];
                $scope.publicKeys   = cmUserModel.data.identity.keys || [];


                $scope.remove = function(key){
                    cmUserModel.removeKey(key);
                    cmModal.closeAll();
                };

                $scope.isTrustedKey = function(key){
                    return cmUserModel.trustsKey(key)
                }

                cmUserModel.on('key:saved', function(local_key){
                    $scope.privateKeys = cmUserModel.loadLocalKeys() || [];
                })


            }
        }
    }
]);