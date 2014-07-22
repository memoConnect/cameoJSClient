'use strict';

angular.module('cmRouteSettings')
.directive('cmIdentityKeysCreate', [
    'cmUserModel', 'cmCrypt', 'cmUtil', 'cmLogger', 'cmNotify', 'cmKey',
    '$window',
    function(cmUserModel, cmCrypt, cmUtil, cmLogger, cmNotify, cmKey,
             $window){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-identity-keys-create.html',
            controller: function ($scope) {
                $scope.identity = cmUserModel.data;

                /**
                 * scope vars for keypair generation
                 * @type {string[]}
                 */
                var detect = cmUtil.detectOSAndBrowser();

                $scope.active = 'choose';
                $scope.keySizes = cmCrypt.getKeySizes();
                $scope.keySize = '2048';
                $scope.keyName = '';
                $scope.i18n = {time:''};

                /**
                 * generate keypair
                 */
                $scope.generate = function(){
                    $scope.active = 'generate';

                    /**
                     * call cmCrypt to generate KeyPair
                     * with keySize and callback for onGeneration
                     * returns a promise
                     */
                    cmCrypt.generateAsyncKeypair(parseInt($scope.keySize),
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
                        var key = (new cmKey())
                            .setName($scope.keyName)
                            .setKey($scope.privKey);

                        cmUserModel
                            .saveKey(key)
                            .syncLocalKeys($scope.keySize);

                        $window.history.back();
                    }
                };
            }
        }
    }
]);