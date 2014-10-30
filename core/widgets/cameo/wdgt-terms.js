'use strict';

angular.module('cmWidgets').directive('cmWidgetTerms', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/cameo/wdgt-terms.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
]);