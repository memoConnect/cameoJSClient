'use strict';

angular.module('cmUser').directive('cmKeyPair', [
    'cmUserModel',
    'cmCrypt',
    'cmUtil',
    'cmLogger',
    'cmNotify',
    '$location',
    function (cmUserModel, cmCrypt, cmUtil, cmLogger, cmNotify, $location){
        return {
            restrict: 'A',
            templateUrl: 'comps/user/drtv-key-pair.html',
            scope: true,

            controller: function($scope, $element, $attrs){
                $scope.ownKeys = [];
                $scope.active = 'showOwnKeys';

                $scope.state = '';
                $scope.privKey = '';
                $scope.pubKey = '';
                $scope.keyName = '';

                $scope.keyName = navigator.appCodeName; //@TODO better Browser Detection

                /**
                 * Navigation
                 */
                $scope.showOwnKeys = function(){
                    $scope.active = 'showOwnKeys';

                    if(('keys' in cmUserModel.data.identity) && cmUserModel.data.identity.keys.length > 0){
                        $scope.ownKeys = [];
                        cmUserModel.data.identity.keys.forEach(function(key){
                            $scope.ownKeys.push(key.exportData());
                        });
                    }
                };

                $scope.showCreateKey = function(){
                    $scope.active = 'createNewKey';
                };

                $scope.showImportKeys = function(){
                    $scope.active = 'finishCreateKey';
                };

                $scope.showExportKey = function(key){
                    $scope.active = 'exportKeyPair';
                    $scope.exportPrivKey = key.privKey;
                    $scope.exportPubKey = key.pubKey;
                    $scope.exportKeyName = key.name;
                    $scope.exportKeySize = key.keySize;
                };

                /**
                 * scope vars for keypair generation
                 * @type {string[]}
                 */
                $scope.keySizes = cmCrypt.getKeySizes();
                $scope.keySize = '2048';
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
                    $scope.active = 'showOwnKeys';
                };
                /**
                 * store key pair
                 */
                $scope.store = function(){
                    var error = false;

                    if($scope.privKey == ''){
                        error = true;
                        cmNotify.warn('check private Key',{ttl:1000});
                    }

                    if($scope.pubKey == ''){
                        error = true;
                        cmNotify.warn('check public Key',{ttl:1000});
                    }

                    if($scope.keyName == ''){
                        error = true;
                        cmNotify.warn('check keyName',{ttl:1000});
                    }

                    if(error !== true){
                        var key = new cmCrypt.Key();
                        key
                            .setName($scope.keyName)
                            .setKey($scope.privKey);

                        cmUserModel.saveKey(key)
                            .syncLocalKeys();
                    }
                };

                /**
                 * sync Keys
                 */
                $scope.syncLocalKeys = function(){
                    cmUserModel.syncLocalKeys();
                };

                if(typeof cmUserModel.data.identity.on == 'function'){
                    cmUserModel.data.identity.on('update:finished', function(){
                        if($scope.active == 'showOwnKeys'){
                            $scope.showOwnKeys();
                        }
                    });
                }
            }
        }
    }
]);