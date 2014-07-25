'use strict';

angular.module('cmRouteSettings').directive('cmIdentityKeyDetail', [
    'cmNotify', 'cmKey', 'cmUtil', 'cmUserModel',
    '$rootScope', '$routeParams',
    function(cmNotify, cmKey, cmUtil, cmUserModel,
             $rootScope, $routeParams){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-identity-key-detail.html',
            controller: function ($scope) {

                var localKeys = cmUserModel.loadLocalKeys()
                var privKey = localKeys.find($routeParams.pageChild2) || {};
                var pubKey = cmUserModel.data.identity.keys.find($routeParams.pageChild2) || {};

                $scope.privKey = 'getPrivateKey' in privKey ? privKey.getPrivateKey() : '';
                $scope.pubKey  = pubKey.getPublicKey();
                $scope.keyName = pubKey.name;
                $scope.keySize = pubKey.getSize();
                $scope.isTrusted = cmUserModel.trustsKey(pubKey);

                $scope.startAuthentication = function(){
                    $rootScope.$broadcast('do:handshake', privKey);
                }
            }
        }
    }
]);