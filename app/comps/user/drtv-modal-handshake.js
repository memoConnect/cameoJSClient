'use strict';

angular.module('cmUser')
.directive('cmModalHandshake',[
    'cmUserModel', 'cmTranslate', 'cmKey', 'cmCrypt', 'cmAuth',
    function (cmUserModel, cmTranslate, cmKey, cmCrypt, cmAuth){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/drtv-modal-handshake.html',
            controller: function($scope){
                $scope.step = 1;
                $scope.keys = [];
                var pleaseChoose = {
                    name:cmTranslate('SETTINGS.PAGES.IDENTITY.HANDSHAKE.CHOOSE'),
                    id:0
                };
                $scope.choosedKey = {};
                $scope.transactionSecret = '';
                $scope.handshakeIdle = false;

                $scope.doHandshakeNow = function(){
                    $scope.step = 2;
                    // get keys from userModel
                    $scope.keys = [pleaseChoose].concat(cmUserModel.data.identity.keys);
                    // init please choose
                    $scope.choosedKey = $scope.keys[0];

                    // own new privKey
                    $scope.ownNewPrivKey = null;
                };

                $scope.setChoosedKey = function(choosedKey){
                    if(choosedKey instanceof cmKey){
                        $scope.step = 3;
                        // set key to tmp
                        $scope.choosedKey = choosedKey;
                        // generate TS
                        $scope.transactionSecret = cmCrypt.generateTransactionSecret();
                    }
                };

                $scope.startHandshake = function(){
                    if($scope.handshakeIdle){
                        return false;
                    }

                    if($scope.choosedKey instanceof cmKey && $scope.transactionSecret != ''){
                        $scope.handshakeIdle = true;

                        var dataForRequest = cmCrypt.sign({
                            identityId: cmUserModel.data.identity.id,
                            transactionSecret: $scope.transactionSecret,
                            fromKey: $scope.ownNewPrivKey,
                            toKey: $scope.choosedKey
                        });

                        cmAuth.startHandshake(dataForRequest);
                    }
                };
            }
        }
    }
]);