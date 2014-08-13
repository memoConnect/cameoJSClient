'use strict';

angular.module('cmRouteSettings').directive('cmIdentityKeyDetail', [
    'cmNotify', 'cmKey', 'cmUtil', 'cmUserModel',
    '$rootScope', '$routeParams',
    function(cmNotify, cmKey, cmUtil, cmUserModel,
             $rootScope, $routeParams){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/identity/drtv-key-detail.html',
            controller: function ($scope) {

                var localKeys   = cmUserModel.loadLocalKeys(),
                    key         = localKeys.find($routeParams.pageChild2) || cmUserModel.data.identity.keys.find($routeParams.pageChild2) || {};

                $scope.privKey      = key && key.getPrivateKey()
                $scope.pubKey       = key && key.getPublicKey()
                $scope.keyName      = key && key.name;
                $scope.keySize      = key && key.getSize()
                $scope.fingerprint  = key && key.getFingerprint()
                $scope.isTrusted    = cmUserModel.verifyOwnPublicKey(key);

            }
        }
    }
]);