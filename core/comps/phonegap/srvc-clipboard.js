'use strict';

// https://github.com/VersoSolutions/CordovaClipboard

angular.module('cmPhonegap')
    .service('cmClipboard', [
        'cmPhonegap',
        '$cordova',
        function (cmPhonegap,
                  $cordova) {
            var self = {
                plugin: null,
                available: false,

                init: function(){
                    cmPhonegap.isReady('cmClipboard',function(){
                        if(!('plugins' in $cordova)
                            || !('clipboard' in $cordova.plugins)) {
                            //cmLogger.info('NETWORK-INFORMATION PLUGIN IS MISSING');
                            return false;
                        }

                        self.available = true;
                        self.plugin = $cordova.plugins.clipboard;
                    })
                },

                copy: function(text){
                    if(!this.available)
                        return false;

                    this.plugin.copy(
                        text,
                        function(){
                            // onSuccess
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

            return self;
        }
    ]);