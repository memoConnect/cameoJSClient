'use strict';

angular.module('cmUser')
.directive('cmModalHandshake',[
    'cmUserModel', 'cmTranslate', 'cmKey', 'cmCrypt', 'cmAuth',
    'cmModal',
    '$rootScope',
    function (cmUserModel, cmTranslate, cmKey, cmCrypt, cmAuth,
              cmModal,
              $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/drtv-modal-handshake.html',
            controller: function($scope){
                function reset(){
                    $scope.step = 1;
                    $scope.keys = [];
                    $scope.toKey = {};
                    $scope.transactionSecret = '';
                    $scope.handshakeIdle = false;
                    $scope.fromKey = null;
                }

                reset();

                cmUserModel.on('key:saved', function(event, fromKey){
                    if(fromKey instanceof cmKey && fromKey.getPrivateKey() != undefined) {
                        $scope.fromKey = fromKey;
                        $rootScope.openModal('handshake');
                    }
                });

                cmModal.on('modal:closed', function(){
                    reset();
                });

                $scope.doHandshake = function(){
                    $scope.step = 2;
                    // get keys from userModel
                    $scope.keys = cmUserModel.data.identity.keys.filter(function(key){
                        return (key.getPrivateKey() == undefined && key != $scope.fromKey);
                    });
                };

                $scope.selectToKey = function(toKey){
                    $scope.toKey = toKey;
                };

                $scope.setToKey = function(toKey){
                    if(toKey instanceof cmKey){
                        $scope.step = 3;
                        // set key to tmp
                        $scope.toKey = toKey;
                        // generate TS
                        $scope.transactionSecret = cmCrypt.generateTransactionSecret();
                    }
                };

                $scope.startHandshake = function(){
                    if($scope.handshakeIdle){
                        return false;
                    }

                    if($scope.toKey instanceof cmKey && $scope.transactionSecret != ''){
                        $scope.handshakeIdle = true;

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
            }
        }
    }
]);