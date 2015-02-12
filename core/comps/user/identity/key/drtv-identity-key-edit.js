'use strict';

angular.module('cmRouteSettings').directive('cmIdentityKeyEdit', [
    'cmNotify', 'cmKey', 'cmUtil', 'cmUserModel',
    '$rootScope', '$routeParams',
    function(cmNotify, cmKey, cmUtil, cmUserModel,
             $rootScope, $routeParams){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/identity/key/drtv-identity-key-edit.html',
            controller: function ($scope) {
                var localKeys   = cmUserModel.loadLocalKeys(),
                    key         = localKeys.find($routeParams.keyId) || cmUserModel.data.identity.keys.find($routeParams.keyId) || {};

                $scope.privKey      = key && key.getPrivateKey();
                $scope.pubKey       = key && key.getPublicKey();
                $scope.keyName      = key && key.name;
                $scope.keySize      = key && key.getSize();
                $scope.fingerprint  = key && key.getFingerprint();

                $scope.isTrusted    = undefined;

                cmUserModel.verifyOwnPublicKey(key)
                .then(function(){
                    $scope.isTrusted = true
                });
            }
        }
    }
]);