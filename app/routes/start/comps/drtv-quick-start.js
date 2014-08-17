'use strict';

angular.module('cmRouteStart').directive('cmQuickStart', [
    '$rootScope',
    '$location',
    function($rootScope, $location){
        return {
            restrict: 'E',
            templateUrl: 'routes/start/comps/drtv-quick-start.html',
            controller: function ($scope) {
                $scope.startRoute = false;

                if($rootScope.urlHistory.length > 1 && $rootScope.urlHistory[$rootScope.urlHistory.length - 2].indexOf('/start') != -1){
                    $scope.startRoute = true;
                }

                $scope.goToKeyInfo = function(){
                    $location.path('/start/keyinfo');
                };
            }
        }
    }
]);