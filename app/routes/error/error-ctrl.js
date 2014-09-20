'use strict';

angular.module('cmRoutes').controller('ErrorCtrl', [
    '$scope',
    '$routeParams',
    function ($scope, $routeParams) {
        $scope.data = $routeParams;
        $scope.data_str = JSON.stringify($scope.data, undefined, 2);
    }
]);