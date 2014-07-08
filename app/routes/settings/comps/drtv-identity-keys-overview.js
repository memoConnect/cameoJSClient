'use strict';

angular.module('cmRouteSettings').directive('cmIdentityKeysOverview', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-identity-keys-overview.html',
            controller: function ($scope) {
                $scope.ownKeys = (cmUserModel.data.identity.keys && cmUserModel.data.identity.keys) || [];

                $scope.showExportKey = function(key){
                    $scope.exportPrivKey = key.getPrivateKey();
                    $scope.exportPubKey  = key.getPublicKey();
                    $scope.exportKeyName = key.name;
                    $scope.exportKeySize = key.getSize();
                };

                $scope.removeKey = function(key){
                    cmUserModel.removeKey(key);
                };
            }
        }
    }
]);