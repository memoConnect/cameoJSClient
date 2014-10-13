'use strict';

angular.module('cmUi').service('cmLoader',[
    function() {
        return function cmLoader($scope){
            $scope.showLoader = false;

            this.start = function(){
                $scope.showLoader = true;
            };

            this.stop = function(){
                $scope.showLoader = false;
            };

            this.isIdle = function(){
                return $scope.showLoader;
            }
        }
    }
]);