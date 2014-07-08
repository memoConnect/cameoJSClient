'use strict';

angular.module('cmRouteSettings').directive('cmIdentityKeysOverview', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-identity-keys-overview.html',
            controller: function ($scope) {
                $scope.identity = cmUserModel.data;
                $scope.ownKeys = (cmUserModel.data.identity.keys && cmUserModel.data.identity.keys) || [];

                /**
                 * Navigation
                 */

                $scope.showExportKey = function(key){
                    $scope.exportPrivKey = key.getPrivateKey();
                    $scope.exportPubKey  = key.getPublicKey();
                    $scope.exportKeyName = key.name;
                    $scope.exportKeySize = key.kgetSize();
                };

                $scope.removeKey = function(key){
                    cmUserModel.removeKey(key);
                };

//                cmUserModel.data.identity.on('update:finished', function(){
//                    console.log('update:finished')
//                    $scope.showKeys();
//                });
//                

            }
        }
    }
]);