'use strict';

angular.module('cmRouteSettings').directive('cmIdentityKeysCreate', [
    'cmUserModel',
    'cmCrypt',
    'cmUtil',
    'cmLogger',
    'cmNotify',
    'cmKey',
    '$interval',
    function(cmUserModel, cmCrypt, cmUtil, cmLogger, cmNotify, cmKey, $interval){
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
                            $scope.$apply();
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
                            $scope.privKey  = '';
                            $scope.pubKey   = '';

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
                };
                /**
                 * store key pair
                 */
                $scope.store = function(){
                    var error = false;

                    if($scope.privKey == ''){
                        error = true;
                        cmNotify.warn('check private Key');
                    }

                    if($scope.pubKey == ''){
                        error = true;
                        cmNotify.warn('check public Key');
                    }

                    if($scope.keyName == ''){
                        error = true;
                        cmNotify.warn('check keyName');
                    }

                    if(error !== true){
                        var key = new cmKey();
                        key
                            .setName($scope.keyName)
                            .setKey($scope.privKey);


                        cmUserModel
                            .saveKey(key)
                            .syncLocalKeys()

                        

                        cmNotify.info('NOTIFICATIONS.TYPES.KEYS.STORE_NEW',{displayType:'modal',ttl:3000});
                    }
                };
            }
        }
    }
]);