'use strict';

// https://github.com/VersoSolutions/CordovaClipboard

angular.module('cmPhonegap')
.service('cmClipboard', [
    'cmPhonegap', 'cmToastNotifcations',
    '$window',
    function (cmPhonegap, cmToastNotifcations,
              $window) {
        var self = {
            plugin: null,
            available: false,

            init: function(){
                cmPhonegap.isReady('cmClipboard',function(){
                    if(!('plugins' in $window) || !('clipboard' in $window.plugins)) {
                        //cmLogger.info('CLIPBOARD PLUGIN IS MISSING');
                        return false;
                    }

                    self.available = true;
                    self.plugin = $window.plugins.clipboard;
                })
            },

            copy: function(text, toastMessage){
                if(!this.available)
                    return false;

                this.plugin.copy(
                    text,
                    function(){
                        cmToastNotifcations.show(toastMessage,'center');
                    },
                    function(){
                        // onError
                    }
                );
            },

            paste: function(){
                if(!this.available)
                    return false;

                this.plugin.paste(
                    function(){
                        // onSuccess
                    },
                    function(){
                        // onError
                    }
                );
            }
        };

        self.init();

        return self;
    }
]);