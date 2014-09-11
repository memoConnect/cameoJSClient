define([
    'app',
    'ngload!pckCore',
    'ngload!pckUi',
    'ngload!pckUser',
    'ngload!pckWidgets'
], function (app) {
    'use strict';

    app.register.controller('StartQuickstartCtrl', [
        '$rootScope',
        '$scope',
        function($rootScope, $scope) {
            $scope.startRoute = false;

            if ($rootScope.urlHistory.length > 1 && $rootScope.urlHistory[$rootScope.urlHistory.length - 2].indexOf('/start') != -1) {
                $scope.startRoute = true;
            }
        }
    ]);
});