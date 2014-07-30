'use strict';

angular.module('cmUser').directive('cmBulkRekeyingRequest',[
    'cmUserModel',
    'cmLogger',
    '$rootScope',
    function (cmUserModel, cmLogger, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/drtv-bulk-rekeying.html',
            controller: function($scope){
                $scope.spinner = false;

                function startRekying(){
                    $scope.spinner = true;

                    cmUserModel.bulkReKeying($scope.data.key1, $scope.data.key2);
                }

                startRekying();

                $scope.showSpinner = function(){
                    $scope.spinner = true;
                };

                $scope.hideSpinner = function(){
                    $scope.spinner = false;
                };
            }
        }
    }
]);