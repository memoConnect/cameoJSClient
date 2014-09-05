define([
    'app',
    'ngload!pckCore',
    'ngload!pckUi',
    'ngload!pckUser',
    'ngload!pckWidgets',
], function (app) {
    'use strict';

    app.register.controller('SettingsIdentityKeyCreateCtrl', [
        '$rootScope',
        '$scope',
        function($rootScope, $scope) {
            $scope.backBtn = true;
            if(typeof $rootScope.generateAutomatic != 'undefined'){
                $scope.backBtn = false;
            }
        }
    ]);
});