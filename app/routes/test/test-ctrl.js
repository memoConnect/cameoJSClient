'use strict';

angular.module('cmRoutes').controller('TestCtrl',
    function ($scope, $rootScope, $q, $timeout, $interval) {

        $rootScope.$broadcast('device:goesToBackground')

    }
);