'use strict';

angular.module('cmPhonegap').service('cmPhonegap', [
    'cmLogger',
    '$q', '$document', '$phonegapCameoConfig', '$navigator',
    function (cmLogger,
              $q, $document, $phonegapCameoConfig, $navigator) {

        var isReady = $q.defer();

        var self = {
            isReady: function(callback){
                if(typeof $phonegapCameoConfig == 'undefined'){
                    return false;
                }

                //cmLogger.info('cmPhonegap.isReady? '+$phonegapCameoConfig.deviceReady)

                // if config doesn't get device ready watch again
                if(!$phonegapCameoConfig.deviceReady){
                    $document[0].addEventListener('deviceready', function () {
                        $phonegapCameoConfig.deviceReady = true;
                        isReady.resolve();
                    });

                    isReady.promise.then(function(){
                        if(typeof callback == 'function')
                            callback();
                    });
                // nothing to wait phonegap is ready
                } else {
                    if(typeof callback == 'function')
                        callback();
                }

                return false;
            },
            initCloseApp: function(){
                return false;

                $document[0].addEventListener('backbutton', function(e) {
                    $navigator.app.exitApp();
                });
            }
        };

        // on home close app
        self.initCloseApp();

        return self;
    }]
);