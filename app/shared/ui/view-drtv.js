'use strict';

function cmView($route){
    return {
        restrict: 'A',
        controller: function($scope){
            $scope.css = $route.current.$$route.css;
        }
    }
}