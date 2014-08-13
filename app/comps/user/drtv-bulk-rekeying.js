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

                function startrekeying(){
                    $scope.spinner = true;

                    cmUserModel.bulkReKeying($scope.data.key1, $scope.data.key2);
                }

                startrekeying();

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