'use strict';

// https://github.com/VersoSolutions/CordovaClipboard

angular.module('cmPhonegap')
.service('cmClipboard', [
    'cmPhonegap', 'cmToastNotifcations',
    '$cordova',
    function (cmPhonegap, cmToastNotifcations,
              $cordova) {
        var self = {
            plugin: null,
            available: false,

            init: function(){
                cmPhonegap.isReady('cmClipboard',function(){
                    if(!('plugins' in $cordova) || !('clipboard' in $cordova.plugins)) {
                        //cmLogger.info('CLIPBOARD PLUGIN IS MISSING');
                        return false;
                    }

                    self.available = true;
                    self.plugin = $cordova.plugins.clipboard;
                })
            },

            copy: function(text, toastMessage){
                console.log('cmClipboard',this.available,arguments)
                if(!this.available)
                    return false;

                this.plugin.copy(
                    text,
                    function(){
                        console.log('copied')
                        cmToastNotifcations.show(toastMessage||'jooo clipboard dude')
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