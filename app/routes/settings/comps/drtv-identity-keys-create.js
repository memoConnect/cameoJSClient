'use strict';

angular.module('cmRouteSettings').directive('cmIdentityKeysCreate', [
    'cmUserModel',
    'cmCrypt',
    'cmUtil',
    'cmLogger',
    'cmNotify',
    'cmTranslate',
    '$location',
    '$rootScope',
    function(cmUserModel, cmCrypt, cmUtil, cmLogger, cmNotify, cmTranslate, $location, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-identity-keys-create.html',
            controller: function ($scope) {
                $scope.identity = cmUserModel.data;

                /**
                 * scope vars for keypair generation
                 * @type {string[]}
                 */
                $scope.active = 'choose';
                $scope.i18n = cmUtil.detectOSAndBrowser();
                $scope.i18n.date = new Date();
                $scope.keySizes = cmCrypt.getKeySizes();
                $scope.keySize = '2048';
                $scope.keyName = '';

                /**
                 * generate keypair
                 */
                $scope.generate = function(){
                    $scope.active = 'generate';

                    $scope.privKey = '';
                    $scope.pubKey = '';

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
                            $scope.i18n.date = new Date();

                            $scope.privKey  = result.key.getPrivateKey();
                            $scope.pubKey   = result.key.getPublicKey();

                            $scope.keyName = cmTranslate('SETTINGS.PAGES.IDENTITY.KEYS.KEY_NAME_VALUE',$scope.i18n);

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
                        var key = new cmCrypt.Key();
                        key
                            .setName($scope.keyName)
                            .setKey($scope.privKey);

                        cmUserModel
                            .saveKey(key)
                            .syncLocalKeys();

                        cmNotify.info('NOTIFICATIONS.TYPES.KEYS.STORE_NEW',{displayType:'modal',ttl:3000});
                    }
                };
            }
        }
    }
]);