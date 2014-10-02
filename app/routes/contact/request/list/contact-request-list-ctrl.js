'use strict';

angular.module('cmRoutes').controller('ContactRequestListCtrl',[
    '$scope',
    '$routeParams',
    function($scope, $routeParams){
        $scope.route = $routeParams.section || '';
    }
]);