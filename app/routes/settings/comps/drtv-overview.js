'use strict';

angular.module('cmRouteSettings').directive('cmOverviewSettings', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-overview.html',
            controller: function ($scope) {

                $scope.overview = cmConfig.routeSettings;
                $scope.Object = Object;
            }
        }
    }
]);