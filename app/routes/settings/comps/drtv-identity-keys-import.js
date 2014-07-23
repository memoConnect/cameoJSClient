'use strict';

angular.module('cmRouteSettings')
.directive('cmIdentityKeysImport', [
    'cmNotify', 'cmKey', 'cmUtil', 'cmUserModel',
    '$window',
    function(cmNotify, cmKey, cmUtil, cmUserModel,
             $window){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-identity-keys-import.html',
            controller: function ($scope) {
                $scope.isValid = false;

                var detect = cmUtil.detectOSAndBrowser();

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
                        var key = (new cmKey()).importData({
                            name: $scope.keyName,
                            privKey: $scope.privKey
                        });

                        cmUserModel
                            .storeKey(key)
                            .syncLocalKeys($scope.keySize);

                        $window.history.back();
                    }
                };
            }
        }
    }
]);