'use strict';

angular.module('cmPhonegap').service('cmPhonegap', [
    '$q',
    function ($q) {

        var isReady = $q.defer();

        var self = {
            isReady: function(callback){
                // if config doesn't get device ready watch again
                if(!phonegap_cameo_config.deviceReady){
                    document.addEventListener('deviceready', function () {
                        phonegap_cameo_config.deviceReady = true;
                        isReady.resolve();
                    });

                    isReady.promise.then(function(){
                        callback();
                    });
                // nothing to wait phonegap is ready
                } else {
                    callback();
                }
            },
            closeApp: function(){
                return false;

                document.addEventListener('backbutton', function(e) {
                    navigator.app.exitApp();
                });
            }
        };

        // on home close app
        self.closeApp();

        return self;
    }]
);