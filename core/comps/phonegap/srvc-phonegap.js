'use strict';

angular.module('cmPhonegap')
.service('cmPhonegap', [
    'cmLogger', 'cmHistory', 'cmModal',
    '$q', '$document', '$phonegapCameoConfig',
    '$navigator', '$rootScope',
    function (cmLogger, cmHistory, cmModal,
              $q, $document, $phonegapCameoConfig,
              $navigator, $rootScope) {

        var isReady = $q.defer();

        var self = {
            init: function(){
                if($phonegapCameoConfig == 'undefined'){
                    return false;
                }

                $document.on('deviceready', function () {
                    $phonegapCameoConfig.deviceReady = true;
                    isReady.resolve();
                });
            },
            isReady: function(whoIs, callback){
                if($phonegapCameoConfig == 'undefined'){
                    return false;
                }

                //cmLogger.info(whoIs+' called cmPhonegap.isReady? '+$phonegapCameoConfig.deviceReady)

                // if config doesn't get device ready watch again
                if(!$phonegapCameoConfig.deviceReady){
                    isReady.promise.then(function(){
                        if(typeof callback == 'function') {
                            //console.log('calling callback of '+whoIs)
                            callback();
                        }
                    });
                // nothing to wait phonegap is ready
                } else {
                    if(typeof callback == 'function')
                        callback();
                }

                return false;
            },
            initDeviceButtons: function(){
                if($document.length > 0 && 'addEventListener' in $document[0]) {
                    // handle history back and exit app
                    $document.on('backbutton', function () {
                        if (cmHistory.isEmpty()) {
                            cmModal.confirm({
                                title: 'MODAL.EXIT.HEADER',
                                text: 'MODAL.EXIT.TEXT'
                            })
                            .then(function() {
                                if('app' in $navigator && 'exitApp' in $navigator.app){
                                    $navigator.app.exitApp();
                                }
                            });
                        } else {
                            $rootScope.goBack();
                        }
                        $rootScope.$apply();
                    });
                    // handle menu
                    $document.on('menubutton', function (e) {
                        $rootScope.$broadcast('cmMenu:toggle');
                        $rootScope.$apply();
                    });
                }
            },
            initDevicesEvents: function(){
                if($document.length > 0 && 'addEventListener' in $document[0]) {
                    // detect when app goes in background
                    $document.on('pause', function () {
                        $rootScope.$emit('cmApi:sleep');
                    });
                    // detect when app goes in foreground
                    $document.on('resume', function () {
                        $rootScope.$emit('cmApi:wakeup');
                    });
                }
            }
        };

        self.init();

        // buttons on device
        self.isReady('cmPhonegap.button init',function(){
            self.initDeviceButtons();
            self.initDevicesEvents();
        });

        return self;
    }]
);