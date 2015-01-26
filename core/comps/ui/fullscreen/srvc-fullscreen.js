'use strict';

// http://www.sitepoint.com/use-html5-full-screen-api/

angular.module('cmUi')
.factory('cmFullscreen',[
    'cmLogger', 'cmObject', 'cmScreenOrientation',
    '$document', '$rootScope', '$window', '$timeout',
    function(cmLogger, cmObject, cmScreenOrientation,
             $document, $rootScope, $window, $timeout) {

        function detectBrowserForFullscreenApi() {
            if (typeof doc.fullscreenEnabled !== 'undefined') {
                isEnabled = 'fullscreenEnabled';
                requestOpen = 'requestFullscreen';
                isOpen = 'fullscreenElement';
                exit = 'exitFullscreen';
                eventChange = 'fullscreenchange';
                eventError = 'fullscreenerror';
                return true;
            } else if (typeof doc.mozFullScreenEnabled !== 'undefined') {
                isEnabled = 'mozFullScreenEnabled';
                requestOpen = 'mozRequestFullScreen';
                isOpen = 'mozFullScreenElement';
                exit = 'mozCancelFullScreen';
                eventChange = 'mozfullscreenchange';
                eventError = 'mozfullscreenerror';
                return true;
            } else if (typeof doc.msFullscreenEnabled !== 'undefined') {
                isEnabled = 'msFullscreenEnabled';
                requestOpen = 'msRequestFullscreen';
                isOpen = 'msFullscreenElement';
                exit = 'msExitFullscreen';
                eventChange = 'MSFullscreenChange';
                eventError = 'MSFullscreenError';
                return true;
            } else if (typeof doc.webkitFullscreenEnabled !== 'undefined') {
                isEnabled = 'webkitFullscreenEnabled';
                requestOpen = 'webkitRequestFullscreen';
                isOpen = 'webkitFullscreenElement';
                exit = 'webkitExitFullscreen';
                eventChange = 'webkitfullscreenchange';
                eventError = 'webkitfullscreenerror';
                return true;
            }
            return false;
        }

        var isEnabled,
            requestOpen,
            isOpen,
            exit,
            eventChange,
            eventError,
            doc = $document[0],
            scrollTop = 0,
        self = {
            lastElement: null,
            isAvailable: function(){
                return doc[isEnabled] ? true : false;
            },
            open: function(element){
                if(!this.isOpen() && element && requestOpen in element){
                    // cache top
                    self.scrollTop = $window.scrollY;

                    //cmScreenOrientation.unlock();

                    // open fullscreen
                    element[requestOpen]();
                    self.lastElement = element;
                }
            },
            isOpen: function(){
                return isOpen && isOpen in doc && doc[isOpen] ? true : false;
            },
            close: function(){
                if(doc[exit]) {
                    doc[exit]();
                }
            },
            handler: {
                change: function(){

                },
                error: function(){

                }
            }
        };

        if(detectBrowserForFullscreenApi()){
            $document.on(eventChange, function (event) {
                var element = self.lastElement;

                self.trigger('change', {
                    element: element,
                    isOpen: self.isOpen()
                });

                if(self.isOpen()){
                    angular.element(element).addClass('is-fullscreen');
                } else {
                    angular.element(element).removeClass('is-fullscreen');
                    // rejump to last top position
                    $timeout(function(){
                        $window.scrollTo(0,self.scrollTop);
                    },50);

                    //cmScreenOrientation.lock();
                }
            });

            $document.on(eventError, function () {
                self.trigger('error',arguments);
            });

            // workarround for device backbutton clicked if fullscreen open
            $rootScope.$on('$locationChangeStart', function(event){
                if(self.isOpen()) {
                    self.close();
                    event.preventDefault();
                }
            });
        }

        cmObject.addEventHandlingTo(self);

    return self;
    }
]);