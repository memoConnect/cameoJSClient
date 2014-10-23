'use strict';

angular.module('cmWidgets').directive('cmWidgetWelcome', [
    function(){
        return {
            restrict: 'E',
            templateUrl: 'widgets/start/wdgt-welcome.html',
            controller: function ($scope) {
            }
        }
    }
]);