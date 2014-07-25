'use strict';

angular.module('cmUser').directive('cmIncomingAuthenticationRequest',[
    'cmAuth',
    'cmUserModel',
    'cmUtil',
    'cmCrypt',
    'cmLogger',
    '$timeout',
    '$document',
    '$rootScope',
    function (cmAuth, cmUserModel, cmUtil, cmCrypt, cmLogger, $timeout, $document, $rootScope){
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

                $scope.transactSecret = '';
                $scope.step = 1;

                $scope.acceptRequest = function(){
                    $scope.step = 2;

                    $timeout(function(){
                        var input = $document[0].querySelector('#inp-transactSecret');
                        input.focus();
                    }, 50);
                };

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

                $scope.authenticationRequest.on('delete:finished',closeModal);

                $scope.$on('$destroy', function(){
                    $scope.authenticationRequest.off('delete:finished',closeModal);
                });

            }
        }
    }
]);