'use strict';

angular.module('cmUser').directive('cmIncomingAuthenticationRequest',[
    'cmAuth', 'cmUserModel', 'cmIdentityFactory', 'cmUtil', 'cmCrypt', 'cmLogger',
    '$timeout', '$document', '$rootScope',
    function (cmAuth, cmUserModel, cmIdentityFactory, cmUtil, cmCrypt, cmLogger,
              $timeout, $document, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/drtv-incoming-authentication-request.html',
            controller: function($scope){
                function setErrorsToDefault(){
                    $scope.error = {
                        "emptyInput": false,
                        "wrongSecret": false
                    };
                }

                setErrorsToDefault();
                $scope.spinner = false;

                $scope.modalMessageVars = {
                    cameoKey: $scope.authenticationRequest.fromKey.name,
                    identity: cmIdentityFactory.create($scope.authenticationRequest.fromIdentityId).getDisplayName()
                };


                $scope.transactSecret = '';

                $timeout(function(){
                    var input = $document[0].querySelector('#inp-transactSecret');
                    input.focus();
                }, 50);

                $scope.verifyCode = function(){
                    setErrorsToDefault();
                    $scope.showSpinner();

                    if($scope.authenticationRequest.verifyTransactionSecret($scope.transactSecret)){
                        $scope.hideSpinner();
                    } else {
                        $scope.error.wrongSecret = true;
                        $scope.hideSpinner();
                    }
                };

                $scope.showSpinner = function(){
                    $scope.spinner = true;
                };

                $scope.hideSpinner = function(){
                    $scope.spinner = false;
                };

                function closeModal(){
                    $rootScope.closeModal('incoming-authentication-request');
                }

                $scope.authenticationRequest.on('secret:verified',closeModal);

                $scope.$on('$destroy', function(){
                    $scope.authenticationRequest.off('secret:verified',closeModal);
                });
            }
        }
    }
]);