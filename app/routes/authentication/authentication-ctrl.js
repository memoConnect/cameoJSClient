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
        'cmUtil', 'cmUserModel', 'cmAuthenticationRequestFactory', 'cmCrypt', 'cmCallbackQueue',
        '$scope', '$rootScope', '$routeParams', '$timeout',
        function(cmUtil, cmUserModel, cmAuthenticationRequestFactory, cmCrypt, cmCallbackQueue, $scope, $rootScope, $routeParams, $timeout) {
            
            var timeoutPromise


            function init(){
                $scope.authenticationRequest    = cmAuthenticationRequestFactory.create()

                $scope.authenticationRequest
                .state.set('outgoing')

                
                $scope.toKey    = $routeParams.keyId && cmUserModel.data.identity.keys.find($routeParams.keyId)
                $scope.step     = $scope.toKey ? 2 : 0


                if($scope.toKey){
                    $scope.authenticationRequest.setToKey($scope.toKey)
                }

                $scope.waiting  = false
            }


            $scope.cancelTimeout = function(){
                if(timeoutPromise)
                    $timeout.cancel(timeoutPromise)
            }

            
            $scope.requestKey = function(){
                $scope.step     = 1
                $scope.waiting  = true

                $scope.timeout = 60000
                $scope.timeoutPromise = $timeout(function(){
                    $scope.cancel()
                    $scope.timeout = 0
                }, $scope.timeout)


                $scope.authenticationRequest
                .sendKeyRequest()
                .then(
                    function(){
                        $scope.waiting = false
                        $scope.cancelTimeout()  
                        $scope.step = 2
                        $scope.startAuthenticationRequest()
                        
                    },
                    function(){
                        $scope.waiting  = false
                    }
                )


            }

            $scope.cancel = function(){
                $scope.authenticationRequest
                    .state
                        .unset('outgoing')
                        .set('canceled')

                $scope.authenticationRequest.deregister()

                init()
            }

            $scope.startAuthenticationRequest = function(){
                cmCallbackQueue.push(function(){
                    return cmCrypt.generateTransactionSecret();
                }).then(
                    function(result){
                        $scope.step = 3
                        $scope.transactionSecret = result[0]

                        var fromKey = cmUserModel.loadLocalKeys()[0]; // ! attention ! works only with one local private key

                        if(fromKey && $scope.transactionSecret != ''){
                            
                                var dataForRequest =    cmCrypt.signAuthenticationRequest({
                                                            identityId: cmUserModel.data.identity.id,
                                                            transactionSecret: $scope.transactionSecret,
                                                            fromKey: fromKey,
                                                            toKey: $scope.authenticationRequest.toKey
                                                        });
                                
                                $scope.timeout = 60000
                                $scope.timeoutPromise = $timeout(function(){
                                    $scope.cancel()
                                    $scope.timeout = 0
                                }, $scope.timeout)


                                $scope.waiting = true

                                console.log(dataForRequest)
                                $scope.authenticationRequest
                                .importData(dataForRequest)
                                .setTransactionSecret($scope.transactionSecret)
                                .setFromKey(fromKey)
                                .send()
                                .then(
                                    function(){
                                        $scope.cancelTimeout()
                                        $scope.step     = 4   
                                        $scope.waiting  = false                         
                                    },
                                    function(){
                                        $scope.cancelTimeout()
                                        $scope.waiting  = false
                                    }
                                )

                        } else {
                            //error
                        }
                    }
                )                
            }

            init()

        }
    ]);
});