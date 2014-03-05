define([
    'app',
    'vendor/crypto/ats-oka/ats-oka',
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
            $scope.keyLengths = ['1024','2048','4096'];
            $scope.exp = 65537;
            $scope.keylen = 1024;
            var timerID = null;
            var BigInteger = titaniumcore.crypto.BigInteger;
            var RSA = titaniumcore.crypto.RSA;
            var RSAKeyFormat = titaniumcore.crypto.RSAKeyFormat;

            RSA.installKeyFormat( RSAKeyFormat );

            $scope.generate = function(){
                if ( timerID != null ) {
                    return;
                }

                function progress(count){

                }

                function result(rsa){

                }

                function done(){
                    timerID = null;

                }

                var rsaKey = new RSA();

                timerID = rsaKey.generateAsync( $scope.keylen, $scope.exp, progress, result, done );
            };

            $scope.cancel = function(){
                if ( timerID != null ) {
                    var id = timerID;
                    timerID = null;
                    clearInterval( id );
                }
            };

        }]);
});