define([
    'app',
    'vendor/crypto/ats-oka/ats-oka',
    'ngload!pckUser',
    'ngload!cmUtil'
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

            /**
             * ats oka async rsa
             */
            $scope.keyLengths = ['128','1024','2048','4096'];
            $scope.exp = 65537;
            $scope.keylen = 128;
            $scope.state = '';
            var timerID = null;
            var BigInteger = titaniumcore.crypto.BigInteger;
            var RSA = titaniumcore.crypto.RSA;
            var RSAKeyFormat = titaniumcore.crypto.RSAKeyFormat;

            RSA.installKeyFormat( RSAKeyFormat );

            $scope.generate = function(){
                if ( timerID != null ) {
                    return;
                }

                function progress(counts){
                    $scope.$apply(function(){
                        $scope.state = 'counts: '+counts;
                    })
                }

                function result(rsa){

                }

                function done( succeeded, count, time ,startTime, finishTime ){
                    timerID = null;
                    cmLogger.debug('ats-oka done')

                    $scope.$apply(function(){
                        $scope.state =
                            'Elapsed Time '+ cmUtil.millisecondsToStr(time)+'\n'+
                            'Step Count '+count+'\n'+
                            'Start Time '+startTime.toString()+'\n'+
                            'Finished Time '+finishTime.toString()

                        $scope.privKey = base64x_encode( rsaKey.privateKeyBytes() );
                        $scope.pubKey = base64x_encode( rsaKey.publicKeyBytes() );
                    });
                }

                var rsaKey = new RSA();
                cmLogger.debug('ats-oka generateAsync')
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