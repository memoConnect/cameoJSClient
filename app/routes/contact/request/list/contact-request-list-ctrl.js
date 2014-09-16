'use strict';

angular.module('cmRoutes').controller('ContactRequestListCtrl',[
    '$scope',
    '$routeParams',
    function($scope, $routeParams){
        // set active setion
        $scope.route = $routeParams.section || '';
    }
]);