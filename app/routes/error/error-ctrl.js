define([
    'app',
], function (app) {
    'use strict';

    app.register.controller('ErrorCtrl', [

        '$scope',
        '$routeParams',

        function ($scope, $routeParams) {
            $scope.data = $routeParams
            $scope.data_str = JSON.stringify($scope.data, undefined, 2)
        }
    ])
})