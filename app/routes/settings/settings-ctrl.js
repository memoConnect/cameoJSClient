define([
    'app',
    'ngload!pckUser'
], function (app) {
    'use strict';

    app.register.controller('SettingsCtrl', [
        '$scope',
        'cmUserModel',
        function($scope, cmUserModel) {
            $scope.identity = cmUserModel.data;

            $scope.logout = function(){
                cmUserModel.doLogout();
            };

            $scope.tabs = [
                {i18n:'BACK',icon:'fa-chevron-left',href:'#/start'},
                {i18n:'SPINNER',icon:'fa-spinner','default':true},
                {i18n:'KEY',icon:'fa-key'}
            ];
        }]);
});