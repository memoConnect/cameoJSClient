'use strict';

angular.module('cmRouteSettings').directive('cmIdentityKeysOverview', [
    'cmUserModel', 'cmModal', 'cmKey',
    function(cmUserModel, cmModal, cmKey){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-identity-keys-overview.html',
            controller: function ($scope) {
                $scope.privateKeys = [];
                $scope.publicKeys = [];
                $scope.trustedKeys = [];
                $scope.signing = false;
                $scope.canCreate = true;
                $scope.isHandshakePossible = false;
                $scope.showNoLocalKeysOnThisDevice = true;
                $scope.showUntrustedPublickeysExists = true;

                function refresh(){

                    $scope.privateKeys  =   cmUserModel.loadLocalKeys() || [];
                    $scope.publicKeys   =   cmUserModel.data.identity.keys || [];
                    $scope.trustedKeys  =   $scope.publicKeys.filter(function(key){
                                                return cmUserModel.verifyOwnPublicKey(key);
                                            });
                    $scope.signing      =   cmUserModel.state.is('signing');


                    $scope.isHandshakePossible = ($scope.privateKeys.length > 0);
					$scope.canCreate    = !cmUserModel.hasPrivateKey();

                    // no key exists
                    $scope.showNoLocalKeysOnThisDevice =
                        $scope.trustedKeys.length == 0 && $scope.publicKeys.length == 0;

                    // publickeys doesnt match trustedkeys
                    $scope.showUntrustedPublickeysExists =
                        $scope.trustedKeys.length < $scope.publicKeys.length;
                }

                $scope.remove = function(key){
                    cmUserModel.removeKey(key);
                    cmModal.closeAll();
                    refresh();
                };

                $scope.isTrustedKey = function(key){
                    return $scope.trustedKeys.indexOf(key) != -1
                };

                $scope.sortByPrivKeys = function(key) {
                    return !($scope.privateKeys.find(key) instanceof cmKey);
                };

                $scope.startAuthentication = function(toKey){
                    cmUserModel.trigger('handshake:start', toKey);
                };

                cmUserModel.state.on('change', refresh);
                cmUserModel.on('key:stored key:removed', refresh);
                cmUserModel.data.identity.on('update:finished', refresh);

                refresh()
            }
        }
    }
]);