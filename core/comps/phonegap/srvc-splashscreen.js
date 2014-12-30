'use strict';

// https://github.com/apache/cordova-plugin-splashscreen/blob/b46cdca795173d67337c97731b343922d24fc770/doc/index.md

angular.module('cmPhonegap')
.service('cmSplashScreen', [
    'cmPhonegap',
    '$navigator', '$timeout',
    function (cmPhonegap,
              $navigator, $timeout){

        var self = {
            plugin: null,

            init: function(){
                cmPhonegap.isReady(function(){
                    if(!('splashscreen' in $navigator)) {
                        //cmLogger.info('SPLASHCREEN PLUGIN IS MISSING');
                        return false;
                    }

                    self.plugin = $navigator.splashscreen;

                    self.hide();
                })
            },
            hide: function(){
                if(self.plugin != null) {
                    $timeout(function(){
                        self.plugin.hide();
                    },100);
                }
            },
            show: function(){
                if(self.plugin != null)
                    self.plugin.show();
            }
        };

        self.init();

        return self;
    }
]);