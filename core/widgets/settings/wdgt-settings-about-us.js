'use strict';

angular.module('cmWidgets').directive('cmWidgetSettingsAboutUs', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-about-us.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
]);