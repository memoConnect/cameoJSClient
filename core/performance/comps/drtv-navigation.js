'use strict';

angular.module('cameoClientPerformance')
.directive('cmNavigation',function(){
    return {
        template: '<a href="#/start">back</a>' +
                  '<h2 ng-if="title">{{title}}</h2>',
        restrict: 'E',
        scope: {
            title: '@cmTitle'
        }
    }
});