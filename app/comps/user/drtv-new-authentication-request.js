'use strict';

angular.module('cmUser').directive('cmNewAuthenticationRequest',[
    'cmAuth',
    'cmUserModel',
    'cmUtil',
    'cmCrypt',
    '$timeout',
    '$document',
    function (cmAuth, cmUserModel, cmUtil, cmCrypt, $timeout, $document){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/drtv-new-authentication-request.html',
            controller: function($scope,$element,$attrs){
                function setErrorsToDefault(){
                    $scope.error = {
                        "emptyInput": false,
                        "wrongSecret": false
                    };
                }

                setErrorsToDefault();
                $scope.spinner = false;

                $scope.transactSecret = '';
                $scope.step = 1;

                $scope.acceptRequest = function(){
                    $scope.step = 2;

                    $timeout(function(){
                        var input = $document[0].querySelector('#inp-transactSecret');
                        input.focus();
                    }, 50)

                };

                $scope.verifyCode = function(){
                    setErrorsToDefault();
                    $scope.showSpinner();

                    if(cmUtil.validateString($scope.transactSecret)){
                        var localKeys = cmUserModel.loadLocalKeys();
                        var toKey = {};

                        localKeys.forEach(function(key){
                            if(key.id == $scope.data.toKeyId){
                                toKey = key;
                            }
                        });

                        if(!cmCrypt.isTransactionSecretValid({
                            userInput: $scope.transactSecret,
                            toKey: toKey,
                            encryptedTransactionSecret: $scope.data.encryptedTransactionSecret
                        })){
                            $scope.error.wrongSecret = true;
                            $scope.hideSpinner();
                        } else {
                            cmUserModel.signKey($scope.data.toKeyId, $scope.data.fromKeyId);
                        }
                    } else {
                        $scope.error.emptyInput = true;
                        $scope.hideSpinner();
                    }
                };

                $scope.showSpinner = function(){
                    $scope.spinner = true;
                };

                $scope.hideSpinner = function(){
                    $scope.spinner = false;
                };


                function finishRequest(){

                    cmAuth.deleteAuthenticationRequest($scope.data.id).then(
                        function(){
                            //jau
                            $scope.step = 3;
                        },
                        function(){
                            //error
                            console.logfg
                        }
                    )
                }

                cmUserModel.on('signature:saved', function(){
                    finishRequest()
                });
            }
        }
    }
]);