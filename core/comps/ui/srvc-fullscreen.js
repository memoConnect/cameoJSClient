'use strict';

// http://www.sitepoint.com/use-html5-full-screen-api/

angular.module('cmUi')
.factory('cmFullscreen',[
    'cmLogger',
    '$document', '$rootScope',
    function(cmLogger,
             $document, $rootScope) {

        function detectBrowserForTabApi() {
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
            self = {
            isAvailable: function(){
                return doc[isEnabled] ? true : false;
            },
            open: function(element){
                if(!this.isOpen() && element && requestOpen in element) {
                    element[requestOpen]();
                } else {
                    this.close();
                }
            },
            isOpen: function(){
                return doc[isOpen] ? true : false;
            },
            close: function(){
                if(doc[exit])
                    doc[exit]();
            },
            handler: {
                change: function(){

                },
                error: function(){

                }
            }
        };

        if(detectBrowserForTabApi()){
            $document.on(eventChange, function (event) {
                if(!self.isOpen()){
                    angular.element(event.target).removeClass('is-fullscreen');
                } else {
                    angular.element(event.target).addClass('is-fullscreen');
                }
            });

            $document.on(eventError, function () {

            });

            // workarround for device backbutton clicked if fullscreen open
            $rootScope.$on('$locationChangeStart', function(event){
                if(self.isOpen()) {
                    self.close();
                    event.preventDefault();
                }
            });
        }

    return self;
    }
]);