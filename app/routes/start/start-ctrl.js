define([
    'app',
    'ngload!pckCore',
    'ngload!pckUi',
    'ngload!pckUser',
    'ngload!pckRouteStart'
], function (app) {
    'use strict';

    app.register.controller('StartCtrl', [
        '$scope',
        '$routeParams',
        function($scope, $routeParams) {
            $scope.pageParent = $routeParams.pageParent || '';
            $scope.route = $scope.pageParent;
        }
    ]);
});