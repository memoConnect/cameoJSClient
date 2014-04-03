'use strict';

function cmKeyPair(cmUserModel, cmCrypt, cmUtil, cmLogger, cmNotify, $location){
    return {
        restrict: 'A',
        templateUrl: 'comps/user/key-pair.html',
        scope: true,

        controller: function($scope, $element, $attrs){
            $scope.ownKeys = [];
            $scope.active = 'finishCreateKey';

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
                $scope.ownKeys = cmUserModel.loadKeys();
            }

            $scope.showCreateKey = function(){
                $scope.active = 'createNewKey';
            }

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

                        $scope.privKey = result.privKey;
                        $scope.pubKey = result.pubKey;

                        $scope.$emit('HIDE-SPINNER');
                        $scope.active = 'finishCreateKey';
                    },
                    function(){
                        $scope.state = 'generation canceled';
                        $scope.privKey = '';
                        $scope.pubKey = '';

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
                    cmUserModel.saveKey({
                        id: '',
                        name: $scope.keyName,
                        pubKey: $scope.pubKey,
                        privKey: $scope.privKey,
                        keySize: $scope.keySize
                    }).then(
                        function(){
                            cmNotify.info('Done',{ttl:1000});

                            cmUserModel.syncKeys();
                        },
                        function(){
                            cmNotify.warn('Error',{ttl:1000});
                        }
                    );
                }
            }

            /**
             * sync Keys
             */
            $scope.syncKeys = function(){
                cmUserModel.syncKeys();
            }
        }
    }
}