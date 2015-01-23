'use strict';

angular.module('cmRoutes').controller('TestCtrl',
    function ($scope, $rootScope, $q, $timeout, $interval) {

        $rootScope.$broadcast('device:goesToBackground')

        $scope.state = '';
        $scope.setState = function(drtv, event){
            $scope.state += drtv+'='+event.type+'\n';
        }

    }
);