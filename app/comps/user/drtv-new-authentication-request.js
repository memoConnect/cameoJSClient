'use strict';

angular.module('cmUser').directive('cmNewAuthenticationRequest',[
    'cmUserModel',
    'cmUtil',
    'cmCrypt',
    '$timeout',
    '$document',
    function (cmUserModel, cmUtil, cmCrypt, $timeout, $document){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/drtv-new-authentication-request.html',
            controller: function($scope,$element,$attrs){
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
                    if(cmUtil.validateString($scope.transactSecret)){
                        var localKeys = cmUserModel.loadLocalKeys();
                        var toKey = {};

                        localKeys.forEach(function(key){
                            if(key.id == $scope.data.toKeyId){
                                toKey = key;
                            }
                        });

                        if(cmCrypt.isTransactionSecretValid({
                            userInput: $scope.transactSecret,
                            toKey: toKey, // pubkey #1 request.toKeyId
                            encryptedTransactionSecret: $scope.data.encryptedTransactionSecret
                        })){
                          console.log('yeah!!!!');
                        } else {
                            /**
                             * Error wrong input
                             */
                            console.log('ohhh!!!!');
                        }


                        ///////////////////////////////////
                        // BE
                        // save signature to newPubKey
                        // POST /identity...


                    } else {
                        /**
                         * Error empty input
                         */
                        console.log('nope!');
                    }
                };
            }
        }
    }
]);