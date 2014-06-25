define([
    'app',
    'ngload!pckUi',
    'ngload!pckUser',
    'ngload!pckRouteSettings'
], function (app) {
    'use strict';

    app.register.controller('SettingsCtrl', [
        '$scope',
        '$rootScope',
        '$routeParams',
        function($scope, $rootScope, $routeParams) {
            $scope.pageTitle = 'SETTINGS.WELCOME';

            $rootScope.$on('pageTitle:change',function(event, newTitle){
                $scope.pageTitle = newTitle;
            });

            $scope.mainPage = $routeParams.mainPage;
            $scope.subPage = $routeParams.subPage;
        }
    ]);
});