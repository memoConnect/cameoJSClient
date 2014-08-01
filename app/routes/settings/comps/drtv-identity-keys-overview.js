'use strict';

angular.module('cmRouteSettings').directive('cmIdentityKeysOverview', [
    'cmUserModel', 'cmModal', 'cmKey',
    function(cmUserModel, cmModal, cmKey){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-identity-keys-overview.html',
            controller: function ($scope) {

                function refresh(){
                    $scope.privateKeys  = cmUserModel.loadLocalKeys() || [];
                    $scope.publicKeys   = cmUserModel.data.identity.keys || [];
                    $scope.trustedKeys  = $scope.publicKeys.filter(function(key){
                                                return cmUserModel.trustsKey(key);
                                            });
                    $scope.signing      = cmUserModel.state.is('signing');
                    $scope.canCreate    = !cmUserModel.hasPrivateKey();
                }

                $scope.remove = function(key){
                    cmUserModel.removeKey(key);
                    cmModal.closeAll();
                };

                $scope.isTrustedKey = function(key){
                    return $scope.trustedKeys.indexOf(key) != -1
                };

                $scope.sortByPrivKeys = function(key) {
                    return !($scope.privateKeys.find(key) instanceof cmKey);
                };

                $scope.$on('$destroy', function(){
                    cmUserModel.off('key:stored', refresh);
                    cmUserModel.off('signature:saved', refresh);
                });

                cmUserModel.state.on('change', refresh);

                cmUserModel.on('key:stored', refresh);

                cmUserModel.on('key:removed', refresh);

                refresh()
            }
        }
    }
]);