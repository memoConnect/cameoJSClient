'use strict';

angular.module('cmUser').directive('cmIdentityKeyList', [
    'cmUserModel',
    'cmModal',
    'cmKey',
    function(cmUserModel, cmModal, cmKey){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/identity/key/drtv-identity-key-list.html',
            controller: function ($scope) {
                $scope.privateKeys = [];
                $scope.publicKeys = [];
                $scope.trustedKeys = [];
                $scope.signing = false;
                $scope.isHandshakePossible = false;
                $scope.showNoLocalKeysOnThisDevice = true;
                $scope.showUntrustedPublickeysExists = true;
                $scope.canCreate = true;

                function refresh(){
                    $scope.canCreate    = !cmUserModel.hasPrivateKey();
                    $scope.privateKeys  = cmUserModel.loadLocalKeys() || [];
                    $scope.publicKeys   = cmUserModel.data.identity.keys || [];
                    $scope.trustedKeys  = $scope.publicKeys.filter(function(key){
                        return cmUserModel.verifyOwnPublicKey(key);
                    });
                    $scope.signing      =   cmUserModel.state.is('signing');

                    $scope.isHandshakePossible = ($scope.privateKeys.length > 0);

                    // no key exists
                    $scope.showNoLocalKeysOnThisDevice =
                        $scope.trustedKeys.length == 0;

                    // publickeys doesnt match trustedkeys
                    $scope.showUntrustedPublickeysExists =
                        $scope.trustedKeys.length != $scope.publicKeys.length &&
                        $scope.trustedKeys.length >= 1 &&
                        $scope.publicKeys.length >= 1;
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
                    cmUserModel.trigger('handshake:start', {key: toKey});
                };

                cmUserModel.state.on('change', refresh);
                cmUserModel.on('key:stored key:removed signatures:saved', refresh);
                cmUserModel.data.identity.on('update:finished', refresh);

                refresh()
            }
        }
    }
]);