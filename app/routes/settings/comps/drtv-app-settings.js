'use strict';

angular.module('cmRouteSettings').directive('cmAppSettings', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-app-settings.html',
            controller: function ($scope) {

            }
        }
    }
]);