'use strict';

function cmKeyPair(cmUserModel, cmCrypt, cmUtil, cmLogger, cmNotify){
    return {
        restrict: 'A',
        templateUrl: 'comps/user/key-pair.html',
        scope: true,

        controller: function($scope, $element, $attrs){
            $scope.ownKeys = [];

            $scope.active = 'showOwnKeys';


            $scope.showOwnKeys = function(){
                $scope.active = 'showOwnKeys';
            }

            $scope.showCreateKey = function(){
                $scope.active = 'createNewKey';
            }

            /**
             * scope vars for keypair generation
             * @type {string[]}
             */
            $scope.keySizes = cmCrypt.getKeySizes();
            $scope.keySize = '2048';
            $scope.state = '';
            /**
             * generate keypair
             */
            $scope.generate = function(){
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
                    },
                    function(){
                        $scope.state = 'generation canceled';
                        $scope.privKey = '';
                        $scope.pubKey = '';

                        $scope.$emit('HIDE-SPINNER');
                    }
                );
            };
            /**
             * cancel keypair generation
             */
            $scope.cancel = function(){
                cmCrypt.cancelGeneration();
                $scope.$emit('HIDE-SPINNER');
            };
        }
    }
}