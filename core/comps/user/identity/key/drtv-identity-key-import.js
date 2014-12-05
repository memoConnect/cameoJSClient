'use strict';

angular.module('cmRouteSettings')
.directive('cmIdentityKeyImport', [
    'cmNotify',
    'cmKey',
    'cmUtil',
    'cmUserModel',
    'cmModal',
    'cmDevice',
    '$window',
    '$rootScope',
    function(cmNotify, cmKey, cmUtil, cmUserModel, cmModal, cmDevice,
             $window, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/identity/key/drtv-identity-key-import.html',
            controller: function ($scope) {
                // only one privKey!!!
                if(cmUserModel.hasPrivateKey()){
                    $rootScope.goTo('/settings/identity/key/list', true);
                    return false;
                }

                $scope.isValid = false;
                $scope.isError = false;

                var detect = cmDevice.detectOSAndBrowser();

                $scope.import = function(){
                    var key = (new cmKey()).importData({
                        name: $scope.keyName,
                        privKey: $scope.privKey
                    });

                    if(!key.getPrivateKey() || !key.getPublicKey() || !key.getSize()){
                        cmNotify.warn('SETTINGS.PAGES.IDENTITY.KEYS.WARN.IMPORT_FAILED')
                    } else {
                        $scope.isValid = true;
                        $scope.pubKey = key.getPublicKey();
                        $scope.keyName = detect.os+' / '+detect.browser;
                        $scope.keySize = key.getSize();
                    }
                };

                $scope.store = function(){
                    var error = false;

                    if($scope.privKey == ''){
                        error = true;
                        cmNotify.warn('SETTINGS.PAGES.IDENTITY.KEYS.WARN.CHECK_PRIVKEY');
                    }

                    if($scope.pubKey == ''){
                        error = true;
                        cmNotify.warn('SETTINGS.PAGES.IDENTITY.KEYS.WARN.CHECK_PUBKEY');
                    }

                    if($scope.keyName == ''){
                        error = true;
                        cmNotify.warn('SETTINGS.PAGES.IDENTITY.KEYS.WARN.CHECK_KEYNAME');
                    }

                    if(error !== true){
                        var key = new   cmKey({
                                            name: $scope.keyName,
                                            privKey: $scope.privKey
                                        });

                        cmUserModel
                            .storeKey(key)
                            .syncLocalKeys();

                        cmUserModel
                            .when('key:saved', null, 5000)
                            .then(
                                function(result){
                                    if(cmUserModel.data.identity.keys.some(function(key){
                                        return key.id != result.data.keyId
                                    })){
                                        $scope.goTo('/authentication')
                                    } else {
                                        $scope.goTo('/talks');
                                    }
                                }
                            );
                    }
                };

                function callback_key_saving_failed(){
                    $scope.isError = true;
                }

                cmUserModel.on('key:removed', callback_key_saving_failed);

                $scope.$on('$destroy', function(){
                    cmUserModel.off('key:removed', callback_key_saving_failed);
                });
            }
        }
    }
]);