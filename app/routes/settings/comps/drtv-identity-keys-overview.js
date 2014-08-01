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

//                    $scope.debug = $scope.trustedKeys.length+' / '+$scope.publicKeys.length;

                    $scope.showKeyTrustDescription =
                        $scope.trustedKeys.length == 0 && $scope.publicKeys.length == 0 || // none key exists
                        $scope.trustedKeys.length < $scope.publicKeys.length; // publickeys doesnt match trustedkeys
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

                cmUserModel.state.on('change', refresh);
                cmUserModel.on('key:stored key:removed', refresh);
                cmUserModel.data.identity.on('update:finished', refresh);

                refresh()
            }
        }
    }
]);