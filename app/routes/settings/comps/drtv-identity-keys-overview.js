'use strict';

angular.module('cmRouteSettings').directive('cmIdentityKeysOverview', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-identity-keys-overview.html',
            controller: function ($scope) {
                $scope.identity = cmUserModel.data;
                $scope.ownKeys = [];

                /**
                 * Navigation
                 */
                $scope.showKeys = function(){
                    if(('keys' in cmUserModel.data.identity) && cmUserModel.data.identity.keys.length > 0){
                        $scope.ownKeys = [];
                        cmUserModel.data.identity.keys.forEach(function(key){
                            $scope.ownKeys.push(key.exportData());
                        });
                    }
                };

                $scope.showExportKey = function(key){
                    $scope.exportPrivKey = key.privKey;
                    $scope.exportPubKey = key.pubKey;
                    $scope.exportKeyName = key.name;
                    $scope.exportKeySize = key.keySize;
                };

                $scope.removeKey = function(key){
                    cmUserModel.removeKey(key);
                };

//                cmUserModel.data.identity.on('update:finished', function(){
//                    console.log('update:finished')
//                    $scope.showKeys();
//                });

                cmUserModel.on('key:removed',function(){
                    console.log('usermodel changes');
                    $scope.showKeys();
                });

                $scope.showKeys();
            }
        }
    }
]);