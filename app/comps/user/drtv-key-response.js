'use strict';

angular.module('cmUser').directive('cmKeyResponse',[
    'cmAuth', 'cmUserModel', '$rootScope',
    function (cmAuth, cmUserModel, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/drtv-key-response.html',
            controller: function($scope){
                $scope.spinner = false;

                // TODO: upgrade protokoll for fromId in key-request
                $scope.modalMessageVars = {
                    device: $scope.authenticationRequest.fromKey.name
                };

                $scope.showSpinner = function(){
                    $scope.spinner = true;
                };

                $scope.hideSpinner = function(){
                    $scope.spinner = false;
                };

                $scope.cancel = function(){
                    $rootScope.closeModal('key-response');
                }

                $scope.accept = function(){
                    $scope.showSpinner();

                    $scope.authenticationRequest.sendKeyResponse();
                };
            }
        }
    }
]);