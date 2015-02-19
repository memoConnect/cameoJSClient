'use strict';

angular.module('cmNodeWebkit').service('cmNWMenu', [
    function (){
        var cmNWMenu = {
            init: function(){
                cmPhonegap.isReady('cmSplashScreen',function(){
                    if(!('splashscreen' in $navigator)) {
                        //cmLogger.info('SPLASHCREEN PLUGIN IS MISSING');
                        return false;
                    }

                    self.plugin = $navigator.splashscreen;

                    self.hide();
                })
            }
        };

        return cmNWMenu;
    }
]);
