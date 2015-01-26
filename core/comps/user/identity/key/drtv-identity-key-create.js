'use strict';

angular.module('cmRouteSettings').directive('cmIdentityKeyCreate', [
    'cmUserModel', 'cmCrypt', 'cmUtil', 'cmLogger', 'cmNotify',
    'cmKey', 'cmJob', 'cmApi', 'cmDevice', 'cmLoader', 'cmHistory',
    '$window', '$rootScope',  '$timeout',
    function(cmUserModel, cmCrypt, cmUtil, cmLogger, cmNotify,
             cmKey, cmJob, cmApi, cmDevice, cmLoader, cmHistory,
             $window, $rootScope, $timeout){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/identity/key/drtv-identity-key-create.html',

            controller: function ($scope) {

                var loader = new cmLoader($scope);

                // only one privKey!!!
                if(cmUserModel.hasPrivateKey()){
                    if(cmHistory.comesFrom('/authentication')){
                        $scope.goTo('/talks', true);
                    } else {
                        $scope.goTo('/settings/identity/key/list', true);
                    }

                    return false;
                }

                $scope.identity = cmUserModel.data;

                /**
                 * scope vars for keypair generation
                 * @type {string[]}
                 */
                var detect      = cmDevice.detectOSAndBrowser(),
                    startTime   = undefined,
                    elapsedTime = 0,
                    generationTimeout = null,
                    generationTimeoutMinutes = 10;

                $scope.active = 'choose'; // choose, active, store
                //$scope.keySizes = cmCrypt.getKeySizes();
                $scope.keySize = 2048;
                $scope.keyName = '';

                $scope.showKeySize = false;
                $scope.toggleKeySize = function(){
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
                                    ?   Math.ceil(Math.max(new Date().getTime() - startTime, 0))
                                    :   Math.ceil(elapsedTime);
                    return elapsedTime;
                };

                function reset(){
                    $timeout.cancel(generationTimeout);
                    cmApi.listenToEvents();
                    cmJob.stop();
                }

                /**
                 * generate keypair
                 */
                $scope.generate = function(withoutTimerReset){
                    // generation timeout for very long generation
                    // especially for iphone 4/4s ios7 uiwebview
                    
                    $timeout.cancel(generationTimeout);
                    generationTimeout = $timeout(function(){
                        $scope.cancelGeneration();
                        $scope.generate(true);
                    },generationTimeoutMinutes * 60 * 1000);



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

                    if(!withoutTimerReset) {
                        startTime = new Date().getTime();
                        elapsedTime = 0;
                    }

                    cmCrypt.generateAsyncKeypair(parseInt(size))
                    .then(
                        function(result){
                            $scope.privKey  = result.key.getPrivateKey();
                            $scope.pubKey   = result.key.getPublicKey();
                            $scope.keyName  = detect.os+' / '+detect.browser;

                            $scope.active = 'store';
                        },
                        function(reason){
                            $scope.active = 'choose';
                        }
                    ).finally(
                        function(){
                            reset();
                            startTime = undefined
                        }
                    );
                };

                $scope.$on('$destroy',function(){
                    reset();
                });


                $scope.cancel = function(){

                    cmCrypt.cancelGeneration()
                    .then(function(){
                        reset();
                        startTime = undefined;

                        if(typeof $rootScope.generateAutomatic != 'undefined'){
                            /**
                             * @TODO siwtch auch, wenn noch keine Talks vorhanden sind
                             */
                            $scope.goTo('/talks');
                        } else {
                            $scope.goBack();
                        }
                        
                    })
                };

                /**
                 * store key pair
                 */
                $scope.store = function(){
                    if(loader.isIdle())
                        return false;

                    loader.start();

                    var error = false;

                    if($scope.privKey == '' || !$scope.privKey){
                        error = true;
                        cmNotify.warn('SETTINGS.PAGES.IDENTITY.KEYS.WARN.CHECK_PRIVKEY');
                    }

                    if($scope.pubKey == '' || !$scope.pubKey){
                        error = true;
                        cmNotify.warn('SETTINGS.PAGES.IDENTITY.KEYS.WARN.CHECK_PUBKEY');
                    }

                    if($scope.keyName == ''){
                        error = true;
                        cmNotify.warn('SETTINGS.PAGES.IDENTITY.KEYS.WARN.CHECK_KEYNAME');
                    }

                    if(error !== true){
                        var key = new cmKey({
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

                        cmJob.stop();
                        loader.stop();
                    } else {
                        loader.stop();
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