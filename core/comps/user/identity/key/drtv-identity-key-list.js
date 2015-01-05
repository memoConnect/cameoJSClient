'use strict';

angular.module('cmUser').directive('cmIdentityKeyList', [
    'cmUserModel',
    'cmModal',
    'cmKey',
    '$timeout',
    function(cmUserModel, cmModal, cmKey, $timeout){
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

                var refresh_scheduled = false

                function schedule_refresh(){
                    if(!refresh_scheduled){
                        refresh_scheduled = true
                        $timeout(function(){
                            refresh_scheduled = false
                            refresh()
                        }, 1000)
                    }
                }

                function refresh(){
                    $scope.canCreate    =   !cmUserModel.hasPrivateKey();
                    $scope.privateKeys  =   cmUserModel.loadLocalKeys() || [];
                    $scope.publicKeys   =   cmUserModel.data.identity.keys || [];

                    $scope.trustedKeys  =   []
                    $scope.checking     =   $scope.publicKeys


                    cmUserModel.verifyIdentityKeys(null, null, true)
                    .then(function(ttrusted_keys){
                        $scope.checking     =   []
                        $scope.trustedKeys = ttrusted_keys
                    })
                        

                    $scope.signing      =   cmUserModel.state.is('signing');

                    $scope.isHandshakePossible = ($scope.privateKeys.length > 0);

                    // no key exists
                    //$scope.showNoLocalKeysOnThisDevice = $scope.trustedKeys.length == 0;
                    $scope.showNoLocalKeysOnThisDevice = $scope.canCreate;

                    // publickeys doesnt match trustedkeys
                    $scope.showUntrustedPublickeysExists =
                        $scope.trustedKeys.length != $scope.publicKeys.length &&
                        $scope.trustedKeys.length >= 1 &&
                        $scope.publicKeys.length >= 1;
                }

                $scope.remove = function(key){
                    $scope.confirm({
                        title: 'SETTINGS.PAGES.IDENTITY.KEYS.REMOVE_KEY',
                        text:  'SETTINGS.PAGES.IDENTITY.KEYS.REMOVE_KEY_REALLY',
                        html:  '<h3>'+key.name+'</h3>{{'+key.created+' | date:"dd.MM.yy - HH:mm"}}'
                    })
                    .then(function(){
                        cmUserModel.removeKey(key);                        
                    })
                    refresh();
                };

                $scope.someKeyNeedsAuthentication = function(){
                    return $scope.trustedKeys.length < $scope.publicKeys.length
                }

                $scope.isTrustedKey = function(key){
                    return $scope.trustedKeys.indexOf(key) != -1
                };

                $scope.stillChecking = function(key){
                    return $scope.checking.indexOf(key) != -1
                };

                $scope.sortByPrivKeys = function(key) {
                    return !($scope.privateKeys.find(key) instanceof cmKey);
                };

                $scope.startAuthentication = function(toKey){
                    cmUserModel.trigger('handshake:start', {key: toKey});
                };

                //Todo: check if refresh has to be called that often
                cmUserModel.state.on('change', schedule_refresh);
                cmUserModel.on('key:stored key:removed signatures:saved identity:updated update:finished cache:updated', schedule_refresh);

                $scope.$on('$destroy',function(){
                    cmUserModel.off('key:stored key:removed signatures:saved identity:updated update:finished cache:updated', schedule_refresh);
                });

                refresh();
            }
        }
    }
]);