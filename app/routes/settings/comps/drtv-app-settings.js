'use strict';

angular.module('cmRouteSettings').directive('cmAppSettings', [
    'cmSettings',
    '$rootScope',
    function(cmSettings, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-app-settings.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                $scope.handleBooleans = function(key) {
                    var newValue = $scope.settings[key] ? false : true;

                    if(cmSettings.set(key, newValue))
                        $scope.settings[key] = newValue;
                };
            }
        }
    }
]);