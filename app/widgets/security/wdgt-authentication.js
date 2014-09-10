'use strict';

angular.module('cmWidgets').directive('cmWidgetAuthentication', [

    'cmUserModel',
    'cmAuthenticationRequest',
    'cmCallbackQueue',
    '$timeout',
    '$rootScope',

    function(cmUserModel, cmAuthenticationRequest, cmCallbackQueue, $timeout, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'widgets/security/wdgt-authentication.html',
            scope: {
                keyId:      '=',
                identityId: '='
            },

            controller: function ($scope) {

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


                $scope.startTimeout = function(time){
                    $scope.cancelTimeout();
                    $scope.timeout = time || 60000;
                    timeoutPromise = $timeout(function(){
                        $scope.cancel();
                        $scope.timeout = undefined;
                    }, $scope.timeout);

                    timeoutInterval = window.setInterval(function(){
                        $scope.timeout -= 1000;

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

                    $scope.step     = 1;
                    $scope.waiting  = true;
                    $scope.startTimeout(120000);

                    cmAuthenticationRequest.generateTransactionSecret(120000)
                    $scope.transactionSecret = cmAuthenticationRequest.getTransactionSecret()

                    cmCallbackQueue
                    .push(function(){
                        return cmAuthenticationRequest.send(
                            $scope.toIdentity,                              //The identity we ask to trust our key
                            cmAuthenticationRequest.getTransactionSecret(), //The secret will share through another channel with the person we believe is the owner of the above identity
                            $scope.keyId                                    //The key that should sign our ownkey; may be undefined
                        )
                    }, 50)
                    .then(function(){
                        cmAuthenticationRequest.on('verified', function(data){
                            $scope.step = 2
                        })
                    })
                }

                $scope.cancel = function(){
                    $scope.cancelTimeout()
                    $scope.waiting  = false
                    $scope.step     = 0
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


                /* ALT:

                var timeoutPromise,
                    timeoutInterval,
                    fromKey = cmUserModel.loadLocalKeys()[0]; // ! attention ! works only with one local private key

                $rootScope.urlHistory.pop();

                if(!fromKey){
                    $rootScope.goTo('/settings/identity/keys', true)
                }

                function init(){
                    $scope.authenticationRequest    = cmAuthenticationRequestFactory.create();

                    $scope.authenticationRequest
                        .state.set('outgoing')

                    //$scope.toKey        = $scope.keyId && cmUserModel.data.identity.keys.find($scope.keyId);
                    $scope.step         = $scope.toKey ? 1 : 0;

                    if($scope.toKey){
                        $scope.authenticationRequest.setToKey($scope.toKey);
                        $scope.startAuthenticationRequest();
                    }


                    $scope.toIdentity    =  $scope.identityId
                        ?   cmContactsModel.findByIdentityId($scope.identityId).identity
                        :   cmUserModel.data.identity;


                    if($scope.toIdentity){
                        $scope.authenticationRequest.setToIdentityId($scope.toIdentity.id);
                    }

                    $scope.waiting              =   false;
                    $scope.transactionSecret    =   undefined;
                    $scope.BASE                 =   $scope.identityId
                        ?   'IDENTITY.KEYS.TRUST.'
                        :   'IDENTITY.KEYS.AUTHENTICATION.';
                }


                $scope.cancelTimeout = function(){
                    if($scope.timeoutPromise)
                        $timeout.cancel($scope.timeoutPromise);

                    if(timeoutInterval)
                        window.clearInterval(timeoutInterval);

                    $scope.timeout = undefined;
                };

                $scope.startTimeout = function(time){
                    $scope.cancelTimeout();
                    $scope.timeout = time || 60000;
                    $scope.timeoutPromise = $timeout(function(){
                        $scope.cancel();
                        $scope.timeout = undefined;
                    }, $scope.timeout);

                    timeoutInterval = window.setInterval(function(){
                        $scope.timeout -= 1000;

                        if($scope.timeout < 0)
                            $scope.timeout = 0;

                        $scope.$digest()
                    }, 1000)
                };


                $scope.requestKey = function(){
                    $scope.step     = 1;
                    $scope.waiting  = true;

                    $scope.startTimeout();

                    $scope.authenticationRequest
                        .setFromKey(fromKey)
                        .sendKeyRequest()
                        .then(
                        function(){
                            $scope.waiting = false;
                            $scope.cancelTimeout();
                            $scope.step = 2;
                            $scope.startAuthenticationRequest();
                        },
                        function(){
                            $scope.waiting  = false;
                        }
                    )
                };

                $scope.cancel = function(){
                    $scope.authenticationRequest
                        .state
                        .unset('outgoing')
                        .set('canceled');

                    $scope.cancelTimeout();

                    $scope.done();
                };

                $scope.startAuthenticationRequest = function(){
                    cmCallbackQueue.push(function(){
                        return cmCrypt.generateTransactionSecret();
                    }).then(
                        function(result){
                            $scope.step = 3;
                            $scope.transactionSecret = result[0];

                            if(fromKey && $scope.transactionSecret != ''){

                                var dataForRequest =    cmCrypt.signAuthenticationRequest({
                                    identityId: cmUserModel.data.identity.id,
                                    transactionSecret: $scope.transactionSecret,
                                    fromKey: fromKey,
                                    toKey: $scope.authenticationRequest.toKey
                                });

                                $scope.startTimeout(120000);

                                $scope.waiting = true;

                                $scope.authenticationRequest
                                    .importData(dataForRequest)
                                    .setTransactionSecret($scope.transactionSecret)
                                    .setFromKey(fromKey)
                                    .send()
                                    .then(
                                    function(){
                                        $scope.cancelTimeout();
                                        $scope.step     = 4;
                                        $scope.waiting  = false;
                                        $scope.done();
                                    },
                                    function(){
                                        $scope.cancelTimeout();
                                        $scope.waiting  = false;
                                    }
                                )

                            } else {
                                //error
                            }
                        }
                    )
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
                };

                init();
                */
            }
        }
    }
]);