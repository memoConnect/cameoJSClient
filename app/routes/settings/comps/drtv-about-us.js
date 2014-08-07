'use strict';

angular.module('cmRouteSettings').directive('cmAboutUs', [
    '$rootScope',
    'cmConfig',
    function($rootScope, cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-about-us.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
]);