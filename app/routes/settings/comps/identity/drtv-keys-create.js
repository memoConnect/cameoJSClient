'use strict';

angular.module('cmRouteSettings').directive('cmIdentityKeysCreate', [
    'cmUserModel', 'cmCrypt', 'cmUtil', 'cmLogger', 'cmNotify', 'cmKey',
    '$window', '$location',
    function(cmUserModel, cmCrypt, cmUtil, cmLogger, cmNotify, cmKey,
             $window, $location){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/identity/drtv-keys-create.html',
            controller: function ($scope) {
                // only one privKey!!!
                if(cmUserModel.hasPrivateKey()){
                    $location.path('/settings/identity/keys');
                    return false;
                }

                $scope.identity = cmUserModel.data;

                /**
                 * scope vars for keypair generation
                 * @type {string[]}
                 */
                var detect = cmUtil.detectOSAndBrowser();

                $scope.active = 'choose'; // choose, active, store
                //$scope.keySizes = cmCrypt.getKeySizes();
                $scope.keySize = {
                    '2048': true,
                    '4096': false
                };
                $scope.keyName = '';
                $scope.i18n = {time:''};

                $scope.showKeySize = false;
                $scope.toggleKeySize = function(){
                    //console.log('toggleKeySize', $scope.showKeySize)
                    if(!$scope.showKeySize){
                        $scope.showKeySize = true;
                    } else {
                        $scope.showKeySize = false;
                    }
                };

                $scope.chooseKeySize = function(size){
                  if(size == '4096'){
                      $scope.keySize = {
                          '2048': false,
                          '4096': true
                      };
                  } else {
                      $scope.keySize = {
                          '2048': true,
                          '4096': false
                      };
                  }
                };

                /**
                 * generate keypair
                 */
                $scope.generate = function(){
                    $scope.active = 'generate';

                    var size = 2048;
                    if($scope.keySize['4096'] == true){
                        size = 4096;
                    }

                    /**
                     * call cmCrypt to generate KeyPair
                     * with keySize and callback for onGeneration
                     * returns a promise
                     */
                    cmCrypt.generateAsyncKeypair(parseInt(size),
                        function(counts, timeElapsed){
                            $scope.i18n.time = cmUtil.millisecondsToStr(timeElapsed);
                        }
                    ).then(
                        function(result){
                            $scope.i18n.time = cmUtil.millisecondsToStr(result.timeElapsed);

                            $scope.privKey  = result.key.getPrivateKey();
                            $scope.pubKey   = result.key.getPublicKey();
                            $scope.keyName  = detect.os+' / '+detect.browser;

                            $scope.active = 'store';
                        },
                        function(){
                            $scope.active = 'choose';
                        }
                    );
                };

                /**
                 * cancel keypair generation
                 */
                $scope.cancel = function(){
                    cmCrypt.cancelGeneration();
                    $scope.active = 'choose';
                    $window.history.back();
                };

                /**
                 * store key pair
                 */
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

                        //$window.history.back();
                        $location.path('/settings/identity/keys');
                    }
                };
            }
        }
    }
]);