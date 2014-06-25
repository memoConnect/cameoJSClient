define([
    'app',
    'ngload!pckUi',
    'ngload!pckUser',
    'ngload!pckRouteSettings'
], function (app) {
    'use strict';

    app.register.controller('SettingsCtrl', [
        '$scope',
        '$routeParams',
        function($scope, $routeParams) {
            $scope.title = 'SETTINGS.WELCOME';

            $scope.mainPage = $routeParams.mainPage;
            $scope.subPage = $routeParams.subPage;
        }
    ]);
});