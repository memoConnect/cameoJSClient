define([
    'app',
    'ngload!pckUser'
], function (app) {
    'use strict';

    app.register.controller('SettingsCtrl', [
        '$scope',
        '$rootScope',
        'cmUserModel',
        function($scope, $rootScope, cmUserModel) {
            $scope.identity = cmUserModel.data;

            /**
             * Ctrl Tabs
             * @type {*[]}
             */
            $scope.tabs = [
                {i18n:'BACK',icon:'fa-chevron-left',href:'#/start'},
                {i18n:'SPINNER',icon:'fa-spinner','default':true},
                {i18n:'KEY',icon:'fa-key'}
            ];


            /**
             * Spinner Tests
             */
            $scope.showSpinner = function(){
                $rootScope.$broadcast('SHOW-SPINNER');
            }

            $scope.hideSpinner = function(){
                $rootScope.$broadcast('HIDE-SPINNER');
            }
        }]);
});