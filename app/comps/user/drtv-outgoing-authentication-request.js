'use strict';

angular.module('cmUser').directive('cmOutgoingAuthenticationRequest',[
    'cmAuthenticationRequestFactory',
    'cmUserModel', 'cmTranslate', 'cmKey', 'cmCrypt', 'cmAuth',
    'cmModal', 'cmHooks', 'cmLogger',
    '$rootScope',
    function (cmAuthenticationRequestFactory,
              cmUserModel, cmTranslate, cmKey, cmCrypt, cmAuth,
              cmModal, cmHooks, cmLogger,
              $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/drtv-outgoing-authentication-request.html',
            scope: true,
            controller: function($scope){

                var authenticationRequest = {};

                var modalId = 'outgoing-authentication-request';
                var privateKeys  = cmUserModel.loadLocalKeys() || [];
                $scope.publicKeys = cmUserModel.data.identity.keys.filter(function(key){
                    return (privateKeys.find(key) == null && key != $scope.fromKey);
                });

                function reset(){
                    $scope.step = 1;
                    $scope.toKey = {};
                    $scope.transactionSecret = '';
                    $scope.handshakeIdle = false;
                    $scope.fromKey = null;
                }

                function init(event, fromKey){
                    if(fromKey instanceof cmKey && // is a cmKey
                        fromKey.getPrivateKey() != undefined && // the privateKey of cmKey != undefined
                        $scope.publicKeys.length > 0 // show only if more then 1 publicKey exists
                        ){
                        $scope.fromKey = fromKey;
                        $rootScope.openModal(modalId);
                    } else {

                    }
                }

                $scope.doHandshake = function(){
                    $scope.step = 2;
                };

                $scope.selectToKey = function(toKey){
                    if($scope.toKey != toKey)
                        $scope.toKey = toKey;
                    else
                        $scope.toKey = {};
                };

                $scope.startHandshake = function(toKey){

                    if($scope.handshakeIdle){
                        return false;
                    }

                    $scope.handshakeIdle = true;

                    if(toKey instanceof cmKey){
                        $scope.step = 3;
                        // set key to tmp
                        $scope.toKey = toKey;
                        // generate TS
                        $scope.transactionSecret = cmCrypt.generateTransactionSecret();
                    }

                    if($scope.toKey instanceof cmKey && $scope.transactionSecret != ''){

                        var dataForRequest = cmCrypt.signAuthenticationRequest({
                            identityId: cmUserModel.data.identity.id,
                            transactionSecret: $scope.transactionSecret,
                            fromKey: $scope.fromKey,
                            toKey: $scope.toKey
                        });

                        authenticationRequest = cmAuthenticationRequestFactory.create(dataForRequest);
                        authenticationRequest.state.set('outgoing');

                        authenticationRequest.save();

                        authenticationRequest.on('request:finished', function(){
                            $scope.handshakeIdle = false;
                            $rootScope.closeModal(modalId);

                            cmAuthenticationRequestFactory.deregister(authenticationRequest);
                        });
                    }
                };

                function finishRequest(){
                    $scope.handshakeIdle = false;
                    $rootScope.closeModal(modalId);
                    authenticationRequest = {};
                }

                // event schmusis
                $rootScope.$on('do:handshake', init);
                cmModal.on('modal:closed', reset);

                $scope.$on('$destroy', function(){
                    cmModal.off('modal:closed', reset);
                });

                reset();
            }
        }
    }
]);