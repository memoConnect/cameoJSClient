'use strict';

// https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin/

angular.module('cmPhonegap')
.service('cmToastNotifcations', [
    'cmPhonegap',
    '$window',
    function (cmPhonegap,
              $window) {

        var self = {
            plugin: null,
            available: false,

            init: function(){
                cmPhonegap.isReady('cmToastNotifcations',function(){
                    if(!('plugins' in $window)
                        || !('toast' in $window.plugins)) {
                        //cmLogger.info('TOAST PLUGIN IS MISSING');
                        return false;
                    }

                    self.available = true;
                    self.plugin = $window.plugins.toast;
                })
            },

            show: function(message, position){
                console.log('cmToastNotifcations.show',this.available,arguments)
                if(!this.available)
                    return false;

                this.plugin.show(
                    message,
                    'short',
                    position || 'bottom'
                );
            }
        };

        self.init();

        return self;
    }
]);