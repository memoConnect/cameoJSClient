'use strict';

angular.module('cmWidgets').directive('cmWidgetAppSettings', [
    'cmSettings',
    function(cmSettings){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-app-settings.html',
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