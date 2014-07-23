'use strict';

angular.module('cmUser').directive('cmModalHandshake',[
    'cmUserModel', 'cmTranslate', 'cmKey', 'cmCrypt', 'cmAuth',
    'cmModal',
    '$rootScope',
    function (cmUserModel, cmTranslate, cmKey, cmCrypt, cmAuth,
              cmModal,
              $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/drtv-modal-handshake.html',
            scope: true,
            controller: function($scope){

                var modalId = 'handshake';
                var privateKeys  = cmUserModel.loadLocalKeys() || [];
                $scope.publicKeys = cmUserModel.data.identity.keys.filter(function(key){
                    return (privateKeys.find(key) == null && key != $scope.fromKey);
                });

                function reset(){
                    $scope.step = 1;
                    $scope.toKey = {};
                    $scope.transactionSecret = '';
                    $scope.handshakeIdle = false;
                    $scope.fromKey = null;
                }

                function init(){
                    if(fromKey instanceof cmKey && // is a cmKey
                        fromKey.getPrivateKey() != undefined && // the privateKey of cmKey != undefined
                        $scope.publicKeys.length > 0 // show only if more then 1 publicKey exists
                        ){
                        console.log($scope.publicKeys.length)
                        $scope.fromKey = fromKey;
                        $rootScope.openModal(modalId);
                    }
                }

                $scope.doHandshake = function(){
                    $scope.step = 2;
                };

                $scope.selectToKey = function(toKey){
                    if($scope.toKey != toKey)
                        $scope.toKey = toKey;
                    else
                        $scope.toKey = {};
                };

                $scope.startHandshake = function(toKey){

                    if($scope.handshakeIdle){
                        return false;
                    }

                    $scope.handshakeIdle = true;

                    if(toKey instanceof cmKey){
                        $scope.step = 3;
                        // set key to tmp
                        $scope.toKey = toKey;
                        // generate TS
                        $scope.transactionSecret = cmCrypt.generateTransactionSecret();
                    }

                    if($scope.toKey instanceof cmKey && $scope.transactionSecret != ''){

                        var dataForRequest = cmCrypt.sign({
                            identityId: cmUserModel.data.identity.id,
                            transactionSecret: $scope.transactionSecret,
                            fromKey: $scope.fromKey,
                            toKey: $scope.toKey
                        });

                        cmAuth.startHandshake(dataForRequest);
                        // TODO: watch for finish event
                        /*
                         $scope.handshakeIdle = false;
                         $rootScope.closeModal();
                        */
                    }
                };

                cmUserModel.on('key:saved', function(event, fromKey){
                    init();
                });

                cmModal.on('modal:opened', function(event, _modalId_){
                    if(modalId == _modalId_){
                        init();
                    }
                });

                cmModal.on('modal:closed', function(){
                    reset();
                });

                reset();
            }
        }
    }
]);