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
        function(cmUtil, cmUserModel, cmAuthenticationRequestFactory, cmCrypt, $scope, $rootScope, $routeParams) {
            

            function init(){
                $scope.authenticationRequest    = cmAuthenticationRequestFactory.create()

                $scope.authenticationRequest
                .state.set('outgoing')

                
                $scope.toKey    = cmUserModel.data.identity.keys.find($routeParams.keyId)
                $scope.step     = $scope.toKey ? 3 : 0

                $scope.waiting  = false
            }

            //Functionality for footer buttons:
            
            $scope.requestKey = function(){
                $scope.step     = 1
                $scope.waiting  = true
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
                    var dataForRequest =    cmCrypt.signAuthenticationRequest({
                                                identityId: cmUserModel.data.identity.id,
                                                transactionSecret: $scope.transactionSecret,
                                                fromKey: fromKey,
                                                toKey: $scope.authenticationRequest.toKey
                                            });

                    $scope.waiting = true

                    $scope.authenticationRequest
                    .importData(dataForRequest)
                    .setTransactionSecret($scope.transactionSecret)
                    .setFromKey(fromKey)
                    .send()
                    .then(function(){
                        $step           = 3
                        $scope.waiting  = false
                    })

                } else {
                    //error
                }
            }

            $scope.cancelKeyRequest = function(){
                $scope.authenticationRequest
                    .state
                        .unset('outgoing')
                        .set('canceled')

                cmAuthenticationRequestFactory.deregister($scope.authenticationRequest)

                init()

                //Todo: event cmApi.on ... entfernen
            }

            init()

        }
    ]);
});