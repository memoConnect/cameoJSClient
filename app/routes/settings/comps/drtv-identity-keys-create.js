'use strict';

angular.module('cmRouteSettings').directive('cmIdentityKeysCreate', [
    'cmUserModel',
    'cmCrypt',
    'cmUtil',
    'cmLogger',
    'cmNotify',
    '$location',
    '$rootScope',
    function(cmUserModel, cmCrypt, cmUtil, cmLogger, cmNotify, $location, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-identity-keys-create.html',
            controller: function ($scope) {
                $scope.identity = cmUserModel.data;

                /**
                 * scope vars for keypair generation
                 * @type {string[]}
                 */
                $scope.keySizes = cmCrypt.getKeySizes();
                $scope.keySize = '2048';

                $scope.active = 'choose';

                /**
                 * generate keypair
                 */
                $scope.generate = function(){
                    $scope.active = 'modalCreateKey';
                    $scope.$emit('SHOW-SPINNER');

                    $scope.state = '';
                    $scope.privKey = '';
                    $scope.pubKey = '';

                    /**
                     * call cmCrypt to generate KeyPair
                     * with keySize and callback for onGeneration
                     * returns a promise
                     */
                    cmCrypt.generateAsyncKeypair(parseInt($scope.keySize),
                        function(counts, timeElapsed){
                            $scope.state =
                                'counts: '+counts+'\n'+
                                'time elapsed: '+cmUtil.millisecondsToStr(timeElapsed);
                            $scope.$apply();
                        }
                    ).then(
                        function(result){
                            $scope.state =
                                'Elapsed Time '+ cmUtil.millisecondsToStr(result.timeElapsed)+'\n'+
                                'Step Count '+result.counts+'\n';

                            $scope.privKey  = result.key.getPrivateKey();
                            $scope.pubKey   = result.key.getPublicKey();

                            $scope.$emit('HIDE-SPINNER');
                            $scope.active = 'finishCreateKey';
                        },
                        function(){
                            $scope.state    = 'generation canceled';
                            $scope.key      = undefined;
                            $scope.privKey  = '';
                            $scope.pubKey   = '';

                            $scope.$emit('HIDE-SPINNER');
                            $scope.active = 'showOwnKeys';
                        }
                    );
                };
                /**
                 * cancel keypair generation
                 */
                $scope.cancel = function(){
                    cmCrypt.cancelGeneration();
                    $scope.$emit('HIDE-SPINNER');
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