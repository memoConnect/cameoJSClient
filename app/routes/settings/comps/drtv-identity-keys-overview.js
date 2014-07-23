'use strict';

angular.module('cmRouteSettings').directive('cmIdentityKeysOverview', [
    'cmUserModel', 'cmModal', 'cmKey',
    function(cmUserModel, cmModal, cmKey){
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
                    return cmUserModel.trustsKey(key);
                };

                $scope.sortByPrivKeys = function(key) {
                    return !($scope.privateKeys.find(key) instanceof cmKey);
                };

                cmUserModel.on('key:saved', function(){
                    $scope.privateKeys = cmUserModel.loadLocalKeys() || [];
                });
            }
        }
    }
]);