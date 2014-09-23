'use strict';

angular.module('cmPhonegap').service('cmPhonegap', [
    '$q', '$document', '$phonegapCameoConfig', '$navigator',
    function ($q, $document, $phonegapCameoConfig, $navigator) {

        var isReady = $q.defer();

        var self = {
            isReady: function(callback){
                if(typeof $phonegapCameoConfig == 'undefined'){
                    return false;
                }

                // if config doesn't get device ready watch again
                if(!$phonegapCameoConfig.deviceReady){
                    console.log('init')
                    $document[0].addEventListener('deviceready', function () {
                        console.log('huhu')
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

                console.log($phonegapCameoConfig)

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