define([
    'app',
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
        'cmCrypt',
    function($scope, $rootScope, cmUserModel, cmLogger, cmUtil, cmCrypt) {
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

        /**
         * ats oka async rsa
         */
        $scope.keyLengths = cmCrypt.getKeyLengths();
        $scope.exp = cmCrypt.getExpotential();
        $scope.keylen = 128;
        $scope.state = '';

        cmCrypt.initGeneration();

        $scope.generate = function(){
            cmCrypt.generateKeypair();
        };

        $scope.cancel = function(){
            cmCrypt.cancelGeneration();
        };
    }]);
});