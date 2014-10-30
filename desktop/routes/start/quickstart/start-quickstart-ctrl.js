'use strict';

angular.module('cmRoutes').controller('StartQuickstartCtrl', [
    '$rootScope',
    '$scope',
    function($rootScope, $scope) {
        $scope.startRoute = false;

        if ($rootScope.urlHistory.length > 1 && $rootScope.urlHistory[$rootScope.urlHistory.length - 2].indexOf('/start') != -1) {
            $scope.startRoute = true;
        }
    }
]);