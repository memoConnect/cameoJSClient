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
         * scope vars for keypair generation
         * @type {string[]}
         */
        $scope.keySizes = cmCrypt.getKeySizes();
        $scope.keySize = '1024';
        $scope.state = '';
        /**
         * generate keypair
         */
        $scope.generate = function(){
            $scope.state = '';
            $scope.privKey = '';
            $scope.pubKey = '';
            /**
             * call cmCrypt to generate KeyPair
             * with keySize and callback for onGeneration
             * returns a promise
             */
            cmCrypt.generateAsyncKeypair(parseInt($scope.keySize),
                function(counts, timeElapsed){
                    $scope.state =
                        'counts: '+counts+'\n'+
                        'time elapsed: '+cmUtil.millisecondsToStr(timeElapsed);
                    $scope.$apply();
                }
            ).then(
                function(result){
                    $scope.state =
                        'Elapsed Time '+ cmUtil.millisecondsToStr(result.timeElapsed)+'\n'+
                        'Step Count '+result.counts+'\n';

                    $scope.privKey = result.privKey;
                    $scope.pubKey = result.pubKey;
                },
                function(){
                    $scope.state = 'generation canceled';
                    $scope.privKey = '';
                    $scope.pubKey = '';
                }
            );
        };
        /**
         * cancel keypair generation
         */
        $scope.cancel = function(){
            cmCrypt.cancelGeneration();
        };
    }]);
});