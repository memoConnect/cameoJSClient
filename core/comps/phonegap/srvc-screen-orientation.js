'use strict';

// http://www.w3.org/TR/screen-orientation/
// https://github.com/yoik/cordova-yoik-screenorientation

angular.module('cmPhonegap')
    .service('cmScreenOrientation', [
        'cmPhonegap',
        '$screen',
        function (cmPhonegap,
                  $screen){

            var self = {
                plugin: null,
                defaultOrientation: 4,//portrait
                orientations: [
                    'portrait-primary',
                    'portrait-secondary',
                    'landscape-primary',
                    'landscape-secondary',
                    'portrait',
                    'landscape'
                ],

                init: function(){
                    cmPhonegap.isReady(function(){
                        if(!('unlockOrientation' in $screen)) {
                            //cmLogger.info('SCREENORIENTATION PLUGIN IS MISSING');
                            return false;
                        }

                        self.plugin = $screen;
                    });
                },
                getCurrent: function(){
                    if(self.plugin != null)
                        return self.plugin.orientation;
                    return self.orientations[4];
                },
                setPortrait: function(){
                    self.lockTo(self.orientations[4]);
                },
                setLandscape: function(){
                    self.lockTo(self.orientations[5]);
                },
                lockTo: function(orientation){
                    if(self.plugin != null && self.orientations.indexOf(orientation))
                        self.plugin.lockOrientation(orientation);
                },
                lock: function(){
                    if(self.plugin != null && self.orientations.indexOf(orientation))
                        self.plugin.lockOrientation(self.orientations[self.defaultOrientation]);
                },
                unlock: function(){
                    if(self.plugin != null)
                        self.plugin.unlockOrientation();
                }
            };

            self.init();

            return self;
        }
    ]);