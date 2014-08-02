'use strict';

angular.module('cmUser').directive('cmKeyRequest',[
    'cmAuth', 'cmUserModel', '$rootScope',
    function (cmAuth, cmUserModel, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/drtv-key-request.html',
            controller: function($scope){
                $scope.spinner = false;

                $scope.showSpinner = function(){
                    $scope.spinner = true;
                };

                $scope.hideSpinner = function(){
                    $scope.spinner = false;
                };

                $scope.cancel = function(){
                    $rootScope.closeModal('key-request');
                };

                $scope.start = function(){
                    $scope.showSpinner();
                    $rootScope.keyRequestSender = true;

                    cmAuth.sendBroadcast({
                        name: "authenticationRequest:key-request",
                        data: {}
                    });

                };
            }
        }
    }
]);