'use strict';

angular.module('cmPhonegap').service('cmPhonegap', [
    'cmLogger',
    '$q', '$document', '$phonegapCameoConfig', '$navigator', '$rootScope',
    function (cmLogger,
              $q, $document, $phonegapCameoConfig, $navigator, $rootScope) {

        var isReady = $q.defer();

        var self = {
            isReady: function(callback){
                if($phonegapCameoConfig == 'undefined'){
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
            initDeviceButtons: function(){
                if($document.length > 0 && 'addEventListener' in $document[0]) {
                    $document[0].addEventListener('backbutton', function (e) {
                        if ($rootScope.urlHistory.length == 0) {
                            cmModal.confirm({
                                title: 'MODAL.EXIT.HEADER',
                                text: 'MODAL.EXIT.TEXT'
                            })
                            .then(function() {
                                $navigator.app.exitApp();
                            });
                        } else {
                            $rootScope.goBack();
                        }
                    });

                    $document[0].addEventListener('menubutton', function (e) {
                        $rootScope.$broadcast('cmMenu:toggle');
                    });
                }
            }
        };

        // on home close app
        self.initDeviceButtons();

        return self;
    }]
);