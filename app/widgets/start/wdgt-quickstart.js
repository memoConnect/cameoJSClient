'use strict';

angular.module('cmWidgets').directive('cmWidgetQuickstart', [
    '$rootScope',
    function($rootScope){
        return {
            restrict: 'E',
            scope: {
                startRoute: '=cmStartRoute'
            },
            templateUrl: 'widgets/start/wdgt-quickstart.html',
            controller: function ($scope) {
                $scope.goTo = $rootScope.goTo;
            }
        }
    }
]);