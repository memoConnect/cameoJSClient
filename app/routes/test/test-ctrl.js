'use strict';

angular.module('cmRoutes').controller('TestCtrl',
    function ($scope, $rootScope, $q, $timeout, $interval, cmModal) {

        $rootScope.$broadcast('cmApi:sleep')

    }
);