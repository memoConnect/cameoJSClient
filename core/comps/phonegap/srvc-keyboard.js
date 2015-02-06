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

                $rootScope.$on('cmEnter:pressed', self.forceClose);
                $rootScope.$on('$locationChangeStart', function(){
                    self.forceClose();
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
                        self.trigger('hidden');
                    })
                    .on('native.keyboardshow',function(){
                        self.trigger('visible');
                    });
                });
            },
            existsPlugin: function(){
                return self.plugin != null;
            },
            isVisible: function(){
                if(self.plugin != null) {
                    return self.plugin.isVisible;
                }
                return false;
            },
            scroll: function(bool){
                if(self.plugin != null) {
                    self.plugin.disableScroll(bool || true);
                    return true;
                }
                return false;
            },
            close: function(){
                if(self.plugin != null) {
                    self.plugin.close();
                    return true;
                }
                return false;
            },
            forceClose: function(){
                self.close();
            },
            show: function(){
                if(self.plugin != null) {
                    self.plugin.show();
                    return true;
                }
                return false;
            },
            focusLast: function(event){
                if($rootScope.lastFocus) {

                    if(event && 'stopPropagation' in event) {
                        event.stopPropagation();
                        event.preventDefault();
                    }

                    //$timeout(function(){
                        self.show();
                        $rootScope.lastFocus.focus();
                    //}, 50);
                    return true;
                }
                return false;
            }
        };

        self.init();

        return self;
    }
]);