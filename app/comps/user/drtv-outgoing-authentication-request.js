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
                var modalId = 'outgoing-authentication-request';

                $scope.toKey = $scope.authenticationRequest.toKey || {};

                function reset(){
                    $scope.step = 1;
                    $scope.transactionSecret = '';
                    $scope.handshakeIdle = false;
                }

                $scope.cancel = function(){
                    $rootScope.closeModal(modalId);
                };

                $scope.start = function(){
                    var fromKey = cmUserModel.loadLocalKeys()[0]; // ! attention ! works only with one local private key

                    if($scope.handshakeIdle){
                        return false;
                    }
                    $scope.handshakeIdle = true;
                    $scope.step = "2";

                    $scope.transactionSecret = cmCrypt.generateTransactionSecret();

                    console.log(fromKey)

                    if(fromKey instanceof cmKey && $scope.toKey instanceof cmKey && $scope.transactionSecret != ''){
                        var dataForRequest = cmCrypt.signAuthenticationRequest({
                            identityId: cmUserModel.data.identity.id,
                            transactionSecret: $scope.transactionSecret,
                            fromKey: fromKey,
                            toKey: $scope.toKey
                        });

                        $scope.authenticationRequest.importData(dataForRequest);
                        $scope.authenticationRequest.send();
                    } else {
                        //error
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