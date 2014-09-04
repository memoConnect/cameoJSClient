'use strict';

angular.module('cmWidgets').directive('cmWidgetAboutUs', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-about-us.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
]);