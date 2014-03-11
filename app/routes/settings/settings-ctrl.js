define([
    'app',
    'cmUserModel',
    'ngload!pckUser',
    'ngload!cmUtil',
    'ngload!cmCrypt'
], function (app) {
    'use strict';

    app.register.controller('SettingsCtrl', [
        '$scope',
        '$rootScope',
        'cmUserModel',
        'cmLogger',
        'cmUtil',
    function($scope, $rootScope, cmUserModel, cmLogger, cmUtil) {
        $scope.identity = cmUserModel.data;

        /**
         * Ctrl Tabs
         * @type {*[]}
         */
        $scope.tabs = [
            {i18n:'BACK',icon:'fa-chevron-left',href:'#/start'},
            {i18n:'SPINNER',icon:'fa-spinner'},
            {i18n:'KEY',icon:'fa-key','default':true}
        ];

        /**
         * Spinner Tests
         */
        $scope.showSpinner = function(){
            $rootScope.$broadcast('SHOW-SPINNER');
        };

        $scope.hideSpinner = function(){
            $rootScope.$broadcast('HIDE-SPINNER');
        };
    }]);
});