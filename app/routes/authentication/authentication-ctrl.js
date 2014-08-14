define([
    'app',
    'ngload!pckCore',
    // 'ngload!pckUi',
    // 'ngload!pckUser',
    // 'ngload!pckValidate',
    // 'ngload!pckRouteSettings'
], function (app) {
    'use strict';

    app.register.controller('AuthenticationCtrl', [
        'cmUtil', 'cmUserModel', 'cmAuthenticationRequestFactory', 'cmCrypt',
        '$scope', '$rootScope', '$routeParams',
        function(cmUtil, cmUserModel, cmAuthenticationRequestFactory, cmCrypt, $scope, $rootScope, $routeParams, $location) {
            $scope.toKey                    = cmUserModel.data.identity.keys.find($routeParams.keyId)
            
            $scope.authenticationRequest    = cmAuthenticationRequestFactory.create()

            $scope.authenticationRequest
            .state.set('outgoing')

            if($scope.toKey != null){
                $scope.step = 3
            } else {
                $scope.step = 0
            }

            $scope.requestKey = function(){
                $scope.step = 1
                $scope.authenticationRequest
                .sendKeyRequest()
                .then(function(){
                    $scope.transactionSecret = cmCrypt.generateTransactionSecret();
                    $scope.step = 2
                    $scope.startAuthenticationRequest()
                })
            }

            $scope.startAuthenticationRequest = function(){
                var fromKey = cmUserModel.loadLocalKeys()[0]; // ! attention ! works only with one local private key

                if(fromKey && $scope.transactionSecret != ''){
                    console.log(fromKey)
                    var dataForRequest =    cmCrypt.signAuthenticationRequest({
                                                identityId: cmUserModel.data.identity.id,
                                                transactionSecret: $scope.transactionSecret,
                                                fromKey: fromKey,
                                                toKey: $scope.authenticationRequest.toKey
                                            });

                    $scope.authenticationRequest
                    .importData(dataForRequest)
                    .setTransactionSecret($scope.transactionSecret)
                    .setFromKey(fromKey)
                    .send()
                } else {
                    //error
                }
            }

            $scope.cancelKeyRequest = function(){
                cmAuthenticationRequestFactory.deregister($scope.authenticationRequest)
                $scope.authenticationRequest = cmAuthenticationRequestFactory.create()
                $scope.step = 0

                //Todo: event cmApi.on ... entfernen
            }

        }
    ]);
});