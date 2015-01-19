'use strict';

// https://github.com/driftyco/ionic-plugins-keyboard

angular.module('cmPhonegap')
    .service('cmKeyboard', [
        'cmPhonegap', 'cmObject',
        '$cordova', '$window', '$rootScope',
        function (cmPhonegap, cmObject,
                  $cordova, $window, $rootScope){

            var self = {
                plugin: null,

                init: function(){
                    cmObject.addEventHandlingTo(self);

                    cmPhonegap.isReady(function(){
                        if(!('plugins' in $cordova) || !('Keyboard' in $cordova.plugins)) {
                            //cmLogger.info('SCREENORIENTATION PLUGIN IS MISSING');
                            return false;
                        }

                        self.plugin = $cordova.plugins.Keyboard;

                        // event handling
                        angular.element($window)
                        .on('native.keyboardhide',function(){
                            self.trigger('cmKeyboard:hidden');
                        })
                        .on('native.keyboardshow',function(){
                            self.trigger('cmKeyboard:visible');
                        });

                        $rootScope.$on('$routeChangeStart', function(){
                           self.close();
                        });
                    });
                },
                scroll: function(bool){
                    if(self.plugin != null)
                        self.plugin.disableScroll(bool);
                },
                close: function(){
                    if(self.plugin != null)
                        self.plugin.close();
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