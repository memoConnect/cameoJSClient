'use strict';

angular.module('cmRoutes').controller('TestCtrl',
    function ($scope, $rootScope, $q, $timeout, $interval, cmModal) {

        $rootScope.$broadcast('cmApi:sleep')

        $scope.isSelected = false;

        $scope.toggle = function(){
            $scope.isSelected = $scope.isSelected ? false : true;
        }
    }
);