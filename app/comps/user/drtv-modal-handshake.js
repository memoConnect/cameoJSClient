'use strict';

angular.module('cmUser').directive('cmModalHandshake',[
    'cmUserModel', 'cmTranslate', 'cmKey', 'cmCrypt', 'cmAuth',
    'cmModal', 'cmHooks', 'cmLogger',
    '$rootScope',
    function (cmUserModel, cmTranslate, cmKey, cmCrypt, cmAuth,
              cmModal, cmHooks, cmLogger,
              $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/drtv-modal-handshake.html',
            scope: true,
            controller: function($scope){

                var authenticationRequest = {};

                var modalId = 'handshake';
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

                        var dataForRequest = cmCrypt.sign({
                            identityId: cmUserModel.data.identity.id,
                            transactionSecret: $scope.transactionSecret,
                            fromKey: $scope.fromKey,
                            toKey: $scope.toKey
                        });

                        cmAuth.startHandshake(dataForRequest).then(
                            function(request){
                                authenticationRequest = angular.extend({}, request);
                            },
                            function(){
                                cmLogger.debug('cmModalHandshake.startHandshake - Error');
                            }
                        );

                    }
                };

                /**
                 * @todo doppelten aufruf vermeiden
                 */
                function callbackFinishHandshake(event, data){
                    cmLogger.debug('cmModalHandshake.callbackFinishHandshake');

                    if('id' in data && data.id == authenticationRequest.id){
                        cmUserModel.signKey(authenticationRequest.fromKeyId, authenticationRequest.toKeyId);
                    }
                }

                function finishRequest(){
                    $scope.handshakeIdle = false;
                    $rootScope.closeModal(modalId);
                    authenticationRequest = {};
                }

                // event schmusi
                $rootScope.$on('do:handshake', init)
                cmUserModel.on('key:saved', init);
                cmModal.on('modal:closed', reset);
                cmHooks.on('authenticationRequest:finished', callbackFinishHandshake);
                cmUserModel.on('signature:saved', finishRequest);

                $scope.$on('$destroy', function(){
                    cmUserModel.off('key:saved', init);
                    cmModal.off('modal:closed', reset);
                    cmHooks.off('authenticationRequest:finished', callbackFinishHandshake);
                    cmUserModel.off('signature:saved', finishRequest);
                });

                reset();
            }
        }
    }
]);