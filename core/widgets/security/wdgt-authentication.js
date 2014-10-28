'use strict';

angular.module('cmWidgets').directive('cmWidgetAuthentication', [

    'cmUserModel',
    'cmAuthenticationRequest',
    'cmCallbackQueue',
    'cmIdentityFactory',
    'cmContactsModel',
    '$timeout',
    '$rootScope',
    '$q',

    function(cmUserModel, cmAuthenticationRequest, cmCallbackQueue, cmIdentityFactory, cmContactsModel, $timeout, $rootScope, $q){
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
                                        ?   cmIdentityFactory.find($scope.identityId)
                                        :   cmUserModel.data.identity

                //Without a key authetication won't work: 
                if(!cmUserModel.loadLocalKeys().length){
                    $rootScope.goTo('/settings/identity/keys', true)
                }

                //Without cameo id authentication won't work:
                if(!$scope.toIdentity.cameoId){
                    $rootScope.goTo('/settings/identity/keys', true)                  
                }


                $scope.BASE =   ($scope.toIdentity == cmUserModel.data.identity)
                                ?   'IDENTITY.KEYS.AUTHENTICATION.'
                                :   'IDENTITY.KEYS.TRUST.'


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
                            $scope.toIdentity.id,                           //The identity we ask to trust our key
                            cmAuthenticationRequest.getTransactionSecret(), //The secret will share through another channel with the person we believe is the owner of the above identity
                            $scope.keyId                                    //The key that should sign our own key; may be undefined
                        )
                    }, 100)
                    .then(function(){
                        //wait for response:
                        return  cmAuthenticationRequest.getTTL()
                             ?  cmAuthenticationRequest.when('started', 'canceled', cmAuthenticationRequest.getTTL())      
                             :  $q.reject()
                    })
                    .then(
                        function(result){
                            $scope.step = 2
                            //wait for key in response to be verified:
                            return cmAuthenticationRequest.when('verification:successful', 'verification:failed', 7000)  
                        },
                        function(result){
                            return  result == 'timeout'
                                    ?   $q.reject('TIMEOUT')
                                    :   $q.reject()
                        }
                    )
                    .then(
                        function(result){
                            var data = result.data

                            return  cmUserModel.signPublicKey(data.key, data.key.id, data.identity)      //wait for key in response to be signed
                                    //Todo: this 'then' should be elsewhere:
                                    .then(function(){    
                                        if(data.identity == cmUserModel.data.identity)      
                                        /*                              
                                        cmAuthenticationRequest.openBulkRequest({
                                            key1: cmUserModel.loadLocalKeys()[0].id,   // Todo: how to treat multiple local keys?
                                            key2: data.key.id
                                        })
                                        */
                                       
                                        cmUserModel.bulkReKeying(cmUserModel.loadLocalKeys()[0].id, data.key.id)
                                    })
                        },
                        function(result){
                            return  result && result.event &&  result.event.name == 'verification:failed'
                                    ?   $q.reject('VERIFY')
                                    :   $q.reject(result)
                        }
                    )
                    .then(
                        function(){
                            $scope.cancel()
                            $scope.step     = 3
                            $scope.waiting  = false
                        },
                        function(error){
                            if(error){
                                $scope.ERROR = error                                
                            }
                            $scope.cancel()
                        }
                    )

                }

                $scope.cancel = function(){
                    $scope.waiting  = false
                    $scope.step     = 0
                    cmAuthenticationRequest.cancel($scope.toIdentity.id)
                };

                $scope.done = function(){
                    $scope.cancel()
                    
                    if($scope.keyId){
                        $rootScope.goTo('settings/identity/key/list', true);
                        return null;
                    }

                    if($scope.identityId){
                        $rootScope.goTo('contact/edit/'+cmContactsModel.findByIdentityId($scope.identityId).id, true);
                        return null
                    }

                    $rootScope.goTo('settings/identity/key/list', true);
                    return null;
                }


                $scope.$on('$destroy', $scope.cancel)

            }
        }
    }
]);