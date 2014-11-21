'use strict';

angular.module('cmRoutes').controller('StartQuickstartCtrl', [
    'cmHistory',
    '$rootScope', '$scope',
    function(cmHistory,
             $rootScope, $scope) {
        $scope.startRoute = false;

        if(cmHistory.comesFrom('/start')){
            $scope.startRoute = true;
        }
    }
]);