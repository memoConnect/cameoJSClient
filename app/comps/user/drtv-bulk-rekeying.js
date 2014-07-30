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

                $scope.startBulkRekeying = function(){
//                    cmLogger.debug('cmBulkRequest.startBulkRekeying');

                    $scope.spinner = true;

                    cmUserModel.bulkReKeying($scope.data.key1, $scope.data.key2);
                };


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