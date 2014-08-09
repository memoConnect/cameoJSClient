'use strict';

angular.module('cmRouteSettings')
.directive('cmIdentityKeysImport', [
    'cmNotify', 'cmKey', 'cmUtil', 'cmUserModel', 'cmModal',
    '$window', '$location',
    function(cmNotify, cmKey, cmUtil, cmUserModel, cmModal,
             $window, $location){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/identity/drtv-keys-import.html',
            controller: function ($scope) {
                // only one privKey!!!
                if(cmUserModel.hasPrivateKey()){
                    $location.path('/settings/identity/keys');
                    return false;
                }

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
                            .syncLocalKeys();

                        $window.history.back();
                    }
                };
            }
        }
    }
]);