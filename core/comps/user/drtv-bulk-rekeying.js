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
                $scope.working = false;


                $scope.startrekeying = function(){
                    $scope.working = true;
                    cmUserModel.bulkReKeying($scope.data.key1, $scope.data.key2);
                }

                //startrekeying();

            }
        }
    }
]);