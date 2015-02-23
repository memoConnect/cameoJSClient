'use strict';

angular.module('cmRoutes').controller('StartQuickstartCtrl', [
    'cmHistory',
    '$scope',
    function(cmHistory,
             $scope) {
        $scope.startRoute = false;

        if (cmHistory.comesFrom('/start')) {
            $scope.startRoute = true;
        }
    }
]);