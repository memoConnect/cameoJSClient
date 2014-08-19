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
        'cmUtil', 'cmUserModel', 'cmContactsModel', 'cmAuthenticationRequestFactory', 'cmCrypt', 'cmCallbackQueue', 'cmModal',
        '$scope', '$rootScope', '$routeParams', '$timeout', '$location', 
        function(cmUtil, cmUserModel, cmContactsModel, cmAuthenticationRequestFactory, cmCrypt, cmCallbackQueue, cmModal, $scope, $rootScope, $routeParams, $timeout, $location) {
            
            var timeoutPromise,
                timeoutInterval,
                fromKey = cmUserModel.loadLocalKeys()[0]; // ! attention ! works only with one local private key

            $rootScope.urlHistory.pop()

            if(!fromKey){
                $rootScope.goto('/settings/identity/keys', true)
            }

            function init(){
                $scope.authenticationRequest    = cmAuthenticationRequestFactory.create()

                $scope.authenticationRequest
                .state.set('outgoing')
                
                $scope.toKey        = $routeParams.keyId && cmUserModel.data.identity.keys.find($routeParams.keyId)
                $scope.step         = $scope.toKey ? 1 : 0

                if($scope.toKey){
                    $scope.authenticationRequest.setToKey($scope.toKey)
                    $scope.startAuthenticationRequest()
                }

                
                $scope.toIdentity    =  $routeParams.identityId
                                        ?   cmContactsModel.findByIdentityId($routeParams.identityId).identity
                                        :   cmUserModel.data.identity


                if($scope.toIdentity){
                     $scope.authenticationRequest.setToIdentityId($scope.toIdentity.id)
                }

                $scope.waiting              =   false
                $scope.transactionSecret    =   undefined
                $scope.BASE                 =   $routeParams.identityId
                                                ?   'IDENTITY.KEYS.TRUST.'
                                                :   'IDENTITY.KEYS.AUTHENTICATION.'
            }


            $scope.cancelTimeout = function(){
                if($scope.timeoutPromise)
                    $timeout.cancel($scope.timeoutPromise)

                if(timeoutInterval)
                    window.clearInterval(timeoutInterval)

                $scope.timeout = undefined
            }

            $scope.startTimeout = function(time){
                $scope.cancelTimeout()
                $scope.timeout = time || 60000                
                $scope.timeoutPromise = $timeout(function(){
                    $scope.cancel()
                    $scope.timeout = undefined
                }, $scope.timeout)

                timeoutInterval = window.setInterval(function(){
                    $scope.timeout -= 1000

                    if($scope.timeout < 0) 
                        $scope.timeout = 0

                    $scope.$digest()
                }, 1000)
            }

            
            $scope.requestKey = function(){
                $scope.step     = 1
                $scope.waiting  = true

                $scope.startTimeout()


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

                $scope.cancelTimeout()

                $scope.done()
            }

            $scope.startAuthenticationRequest = function(){
                cmCallbackQueue.push(function(){
                    return cmCrypt.generateTransactionSecret();
                }).then(
                    function(result){
                        $scope.step = 3
                        $scope.transactionSecret = result[0]

                        if(fromKey && $scope.transactionSecret != ''){
                            
                                var dataForRequest =    cmCrypt.signAuthenticationRequest({
                                                            identityId: cmUserModel.data.identity.id,
                                                            transactionSecret: $scope.transactionSecret,
                                                            fromKey: fromKey,
                                                            toKey: $scope.authenticationRequest.toKey
                                                        });
                                
                                $scope.startTimeout(120000)

                                $scope.waiting = true

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
                                        $scope.done()
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

            $scope.done = function(){

                if($routeParams.keyId){
                    $rootScope.goto('settings/identity/keys', true)
                    return null
                }


                if($routeParams.identityId){
                    $rootScope.goto('contact/'+cmContactsModel.findByIdentityId($routeParams.identityId).id, true)
                    return null
                }

                $rootScope.goto('settings/identity/keys', true)
                return null
            }

            init()

        }
    ]);
});