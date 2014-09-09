'use strict';

angular.module('cmWidgets').directive('cmWidgetSystemcheck', [
    'cmSystemCheck',
    function(cmSystemCheck){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-systemcheck.html',
            controller: function ($scope) {
                $scope.localStorage = cmSystemCheck.checkLocalStorage();
            }
        }
    }
]);