'use strict';

angular.module('cmUser').directive('cmOutgoingAuthenticationRequest',[
    'cmAuthenticationRequestFactory', 'cmUserModel', 'cmTranslate', 'cmKey',
    'cmCrypt', 'cmAuth', 'cmModal', 'cmHooks', 'cmLogger',
    '$rootScope',
    function (cmAuthenticationRequestFactory, cmUserModel, cmTranslate, cmKey,
              cmCrypt, cmAuth, cmModal, cmHooks, cmLogger,
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
                    $scope.fromKey = {};
                    $scope.transactionSecret = '';
                    $scope.handshakeIdle = false;
                }

                $scope.cancel = function(){
                    $rootScope.closeModal(modalId);
                };

                $scope.selectToKey = function(toKey){
                    if($scope.toKey != toKey)
                        $scope.toKey = toKey;
                    else
                        $scope.toKey = {};
                };

                $scope.startHandshake = function(toKey){
                    var fromKey = privateKeys[0]; // ! attention ! works only with one local private key

                    if($scope.handshakeIdle){
                        return false;
                    }

                    $scope.handshakeIdle = true;

                    if(toKey instanceof cmKey){
                        $scope.step = "2";
                        // set key to tmp
                        $scope.toKey = toKey;
                        // generate TS
                        $scope.transactionSecret = cmCrypt.generateTransactionSecret();
                    }

                    if(fromKey instanceof cmKey && $scope.toKey instanceof cmKey && $scope.transactionSecret != ''){
                        var dataForRequest = cmCrypt.signAuthenticationRequest({
                            identityId: cmUserModel.data.identity.id,
                            transactionSecret: $scope.transactionSecret,
                            fromKey: fromKey,
                            toKey: $scope.toKey
                        });

                        authenticationRequest = cmAuthenticationRequestFactory.create(dataForRequest);
                        authenticationRequest.state.set('outgoing');

                        authenticationRequest.send();

                        authenticationRequest.one('request:finished', function(){

                            $scope.handshakeIdle = false;
                            $rootScope.closeModal(modalId);

                            cmAuthenticationRequestFactory.deregister(authenticationRequest);
                        });
                    }
                };

                // event schmusis
                cmModal.on('modal:closed', reset);

                $scope.$on('$destroy', function(){
                    cmModal.off('modal:closed', reset);
                });

                reset();
            }
        }
    }
]);