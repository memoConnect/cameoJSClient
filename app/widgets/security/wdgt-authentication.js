'use strict';

angular.module('cmWidgets').directive('cmWidgetAuthentication', [

    'cmUserModel',
    'cmAuthenticationRequest',
    'cmCallbackQueue',
    'cmContactsModel',
    '$timeout',
    '$rootScope',
    '$q',

    function(cmUserModel, cmAuthenticationRequest, cmCallbackQueue, cmContactsModel, $timeout, $rootScope, $q){
        return {
            restrict: 'E',
            templateUrl: 'widgets/security/wdgt-authentication.html',
            scope: {
                keyId:      '=',
                identityId: '='
            },

            controller: function ($scope, $element, $attrs) {

                var timeoutInterval,
                    timeoutPromise

                $scope.step         =   0
                $scope.waiting      =   false
                $scope.toIdentity   =   $scope.identityId 
                                        ?   cmContactsModel.findByIdentityId($scope.identityId).identity
                                        :   cmUserModel.data.identity

                //Without a key authetication won't work: 
                if(!cmUserModel.loadLocalKeys().length){
                    $rootScope.goTo('/settings/identity/keys', true)
                }

                //Without cameo id authentication won't work:
                if(!$scope.toIdentity.cameoId){
                    $rootScope.goTo('/settings/identity/keys', true)                  
                }


                $scope.BASE = $scope.identityId
                ?   'IDENTITY.KEYS.TRUST.'
                :   'IDENTITY.KEYS.AUTHENTICATION.';


                $scope.getTimeout = function(){
                    return cmAuthenticationRequest.getTTL()
                }
               
                $scope.startAuthenticationRequest = function(){
                    $scope.ERROR    = undefined
                    $scope.waiting  = true;

                    cmAuthenticationRequest.generateTransactionSecret(120000)
                    $scope.transactionSecret = cmAuthenticationRequest.getTransactionSecret()
                    $scope.step = 1

                    cmCallbackQueue
                    .push(function(){
                        return cmAuthenticationRequest.send(
                            $scope.toIdentity,                              //The identity we ask to trust our key
                            cmAuthenticationRequest.getTransactionSecret(), //The secret will share through another channel with the person we believe is the owner of the above identity
                            $scope.keyId                                    //The key that should sign our own key; may be undefined
                        )
                    }, 100)
                    .then(function(){
                        //wait for response:
                        return cmAuthenticationRequest.when('started', 'canceled', cmAuthenticationRequest.getTTL())      
                    })
                    .then(
                        function(result){
                            $scope.step = 2
                            //wait for key in response to be verified:
                            return cmAuthenticationRequest.when('verification:successful', 'verification:failed', 7000)  
                        },
                        function(result){
                            return  result.event && result.event.name == 'canceled'
                                    ?   $q.reject()
                                    :   $q.reject('TIMEOUT')
                        }
                    )
                    .then(
                        function(result){
                            var data = result.data
                            return cmUserModel.signPublicKey(data.key, data.key.id, data.identity)      //wait for key in response to be signed
                        },
                        function(result){
                            return  result && result.event &&  result.event.name == 'verification:failed'
                                    ?   $q.reject('VERIFY')
                                    :   $q.reject(result)
                        }
                    )
                    .then(
                        function(){
                            $scope.step     = 3
                            $scope.waiting  = false
                        },
                        function(error){
                            if(error){
                                $scope.ERROR = error
                                $scope.cancel()
                            }
                        }
                    )

                }

                $scope.cancel = function(){
                    $scope.waiting  = false
                    $scope.step     = 0
                    cmAuthenticationRequest.cancel($scope.toIdentity)
                };

                $scope.done = function(){

                    if($scope.keyId){
                        $rootScope.goTo('settings/identity/keys', true);
                        return null;
                    }

                    if($scope.identityId){
                        $rootScope.goTo('contact/edit/'+cmContactsModel.findByIdentityId($scope.identityId).id, true);
                        return null
                    }

                    $rootScope.goTo('settings/identity/keys', true);
                    return null;
                }


                $scope.$on('$destroy', $scope.cancel)

            }
        }
    }
]);