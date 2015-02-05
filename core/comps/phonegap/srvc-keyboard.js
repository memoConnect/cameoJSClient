'use strict';

// https://github.com/driftyco/ionic-plugins-keyboard

angular.module('cmPhonegap')
.service('cmKeyboard', [
    'cmPhonegap', 'cmObject',
    '$cordova', '$window', '$rootScope', '$timeout',
    function (cmPhonegap, cmObject,
              $cordova, $window, $rootScope, $timeout){

        var self = {
            plugin: null,

            init: function(){
                cmObject.addEventHandlingTo(self);

                $rootScope.$on('$routeChangeSuccess', function(){
                    $rootScope.lastFocus = undefined;
                });

                cmPhonegap.isReady('cmKeyboard',function(){
                    if(!('plugins' in $cordova) || !('Keyboard' in $cordova.plugins)) {
                        //cmLogger.info('KEYBOARD PLUGIN IS MISSING');
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

                    $rootScope.$on('$locationChangeStart', function(){
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
            },
            focusLast: function(){
                if($rootScope.lastFocus) {
                    console.log('focus last element',$rootScope.lastFocus)
                    self.show();
                    $timeout(function(){
                        $rootScope.lastFocus.focus();
                    },50);
                }
            }
        };

        self.init();

        return self;
    }
]);