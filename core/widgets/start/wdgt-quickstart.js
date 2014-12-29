'use strict';

angular.module('cmWidgets').directive('cmWidgetQuickstart', [
    function(){
        return {
            restrict: 'E',
            scope: {
                startRoute: '=cmStartRoute'
            },
            templateUrl: 'widgets/start/wdgt-quickstart.html',
            controller: function ($scope) {
                
            }
        }
    }
]);