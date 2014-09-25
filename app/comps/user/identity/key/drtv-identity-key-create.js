'use strict';

angular.module('cmRouteSettings').directive('cmIdentityKeyCreate', [
    'cmUserModel',
    'cmCrypt',
    'cmUtil',
    'cmLogger',
    'cmNotify',
    'cmKey',
    'cmJob',
    'cmApi',
    'cmDevice',
    '$window',
    '$rootScope',
    function(cmUserModel, cmCrypt, cmUtil, cmLogger,
             cmNotify, cmKey, cmJob, cmApi, cmDevice,
             $window, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/identity/key/drtv-identity-key-create.html',
            controller: function ($scope) {
                // only one privKey!!!
                if(cmUserModel.hasPrivateKey()){
                    $scope.goTo('/settings/identity/key/list', true);
                    return false;
                }

                $scope.identity = cmUserModel.data;

                /**
                 * scope vars for keypair generation
                 * @type {string[]}
                 */
                var detect      = cmDevice.detectOSAndBrowser(),
                    startTime   = undefined,
                    elapsedTime = 0;

                $scope.active = 'choose'; // choose, active, store
                //$scope.keySizes = cmCrypt.getKeySizes();
                $scope.keySize = 2048;
                $scope.keyName = '';

                $scope.showKeySize = false;
                $scope.toggleKeySize = function(){
                    //console.log('toggleKeySize', $scope.showKeySize)
                    if(!$scope.showKeySize){
                        $scope.showKeySize = true;
                    } else {
                        $scope.showKeySize = false;
                    }
                };

                $scope.keySize = 2048;
                $scope.chooseKeySize = function(size){
                    if(size == '4096'){
                        $scope.keySize = 4096;
                    } else {
                        $scope.keySize = 2048;
                    }
                };

                $scope.getElapsedTime = function(){
                    elapsedTime =   startTime 
                                    ?   Math.max(new Date().getTime() - startTime, 0)
                                    :   elapsedTime;

                    return elapsedTime;
                };

                /**
                 * generate keypair
                 */
                $scope.generate = function(){
                    $scope.active = 'generate';
                    cmJob.start('DRTV.CONFIRM.STANDARD', $scope.cancelGeneration);

                    var size = 2048;
                    if($scope.keySize == 4096){
                        size = 4096;
                    }

                    /**
                     * call cmCrypt to generate KeyPair
                     * with keySize and callback for onGeneration
                     * returns a promise
                     */
                    cmApi.stopListeningToEvents();

                    startTime   = new Date().getTime();
                    elapsedTime = 0;

                    cmCrypt.generateAsyncKeypair(parseInt(size))
                    .then(
                        function(result){
                            // $scope.i18n.time = cmUtil.millisecondsToStr(result.timeElapsed);

                            $scope.privKey  = result.key.getPrivateKey();
                            $scope.pubKey   = result.key.getPublicKey();
                            $scope.keyName  = detect.os+' / '+detect.browser;

                            $scope.active = 'store';
                        },
                        function(){
                            $scope.active = 'choose';
                        }
                    ).finally(
                        function(){
                            cmApi.listenToEvents();
                            startTime = undefined
                        }
                    );
                };

                $scope.$on('$destroy',function(){
                    cmApi.listenToEvents();
                });

                /**
                 * cancel keypair generation
                 */
                $scope.cancelGeneration = function(){
                    //cmLogger.debug('cancel key generation');
                    cmCrypt.cancelGeneration();
                    cmJob.stop();
                    cmApi.listenToEvents();
                    startTime = undefined
                };

                $scope.cancel = function(){
//                    cmLogger.debug('cancel');
                    $scope.cancelGeneration();

                    if(typeof $rootScope.generateAutomatic != 'undefined'){
                        /**
                         * @TODO siwtch auch, wenn noch keine Talks vorhanden sind
                         */
                        $scope.goTo('/talks');
                    } else {
                        $scope.goBack();
                    }
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
                                function(data){
                                    if(cmUserModel.data.identity.keys.some(function(key){
                                        return key.id != data.keyId
                                    })){
                                        $scope.goto('/authentication')
                                    } else {
                                        $scope.goTo('/talks');
                                    }
                                }
                            )


                        cmJob.stop();

                    }
                };

                var generateAutomatic = false;
                if(typeof $rootScope.generateAutomatic != 'undefined'){
                    if('generate' in $rootScope.generateAutomatic && $rootScope.generateAutomatic.generate == true){
                        generateAutomatic = true;

                        if('keySize' in $rootScope.generateAutomatic && parseInt($rootScope.generateAutomatic.keySize) == 4096){
                            $scope.keySize = 4096;
                        } else {
                            $scope.keySize = 2048;
                        }

                        $scope.generate();
                    }

                    $rootScope.generateAutomatic = {}
                }
            }
        }
    }
]);