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

                console.log($scope.toIdentity.getDisplayName())


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


                $scope.startTimeout = function(time){
                    $scope.cancelTimeout();
                    $scope.timeout          = time || 60000;
                    var timeout_start       = new Date().getTime()

                    timeoutInterval = window.setInterval(function(){
                        console.log(timeout_start)
                        $scope.timeout = time-Math.ceil((new Date().getTime()-timeout_start));

                        if($scope.timeout < 0)
                            $scope.timeout = 0;

                        $scope.$digest()
                    }, 1000)
                };


                $scope.cancelTimeout = function(){
                    if($scope.timeoutPromise)
                        $timeout.cancel(timeoutPromise);

                    if(timeoutInterval)
                        window.clearInterval(timeoutInterval);

                    $scope.timeout = undefined
                }
                
                $scope.startAuthenticationRequest = function(){
                    $scope.ERROR    = undefined
                    $scope.waiting  = true;
                    $scope.startTimeout(120000);

                    cmAuthenticationRequest.generateTransactionSecret(120000)
                    $scope.transactionSecret = cmAuthenticationRequest.getTransactionSecret()

                    cmCallbackQueue
                    .push(function(){
                        return cmAuthenticationRequest.send(
                            $scope.toIdentity,                              //The identity we ask to trust our key
                            cmAuthenticationRequest.getTransactionSecret(), //The secret will share through another channel with the person we believe is the owner of the above identity
                            $scope.keyId                                    //The key that should sign our own key; may be undefined
                        )
                    }, 50)
                    .then(function(){
                        $scope.step = 1
                        return cmAuthenticationRequest.when('started', $scope.timeout)      //wait for response
                    })
                    .then(
                        function(request){
                            $scope.cancelTimeout()
                            $scope.step = 2
                            return cmAuthenticationRequest.when('verified', 5000)           //wait for key in response to be verified
                        },
                        function(){
                            $scope.ERROR = $scope.ERROR || 'TIMEOUT' 
                            return $q.reject()
                        }
                    )
                    .then(
                        function(data){
                            return cmUserModel.signPublicKey(data.key, data.key.id, data.identity)  //wait for key in response to be signed
                        },
                        function(error){
                            $scope.ERROR = $scope.ERROR || 'VERIFY' 
                            return $q.reject()
                        }
                    )
                    .then(
                        function(){
                            $scope.step     = 3
                            $scope.waiting  = false
                        },
                        function(error){
                            $scope.ERROR = $scope.ERROR || 'SIGNING'
                            $scope.cancel()
                        }
                    )

                }

                $scope.cancel = function(step){
                    $scope.cancelTimeout()
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
                        $rootScope.goTo('contact/'+cmContactsModel.findByIdentityId($scope.identityId).id, true);
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