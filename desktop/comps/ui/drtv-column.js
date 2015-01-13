'use strict';

angular.module('cmDesktopUi').directive('cmColumn',[
    '$rootScope', '$window', '$document',
    function ($rootScope, $window, $document) {
        return {
            restrict: 'E',
            link: function(scope, element){
                function addGrabber(){
                    if(element.find('cm-desktop-widget-menu').length == 1)
                        element.append('<div class="grabber"></div>');
                }

                addGrabber();

                function handleScrollable(){
                    if(element.find('cm-scrollable').length == 1){
                        element.css({'overflow':'hidden'});
                    }
                }

                var listen_to_scrollable = $rootScope.$on('cm-scrollable:loaded', handleScrollable);

                function resize(){
                    var header = $document[0].querySelector('cm-header'),
                        winHeight = $window.innerHeight,
                        children = element.children();
                    
                    if(children.length == 1)
                        children.css('height',(winHeight-header.offsetHeight)+'px');
                }

                angular.element($window).on('resize', resize);

                resize();

                scope.$on('$destroy', function(){
                    listen_to_scrollable();
                    angular.element($window).off('resize', resize);
                });
            }
        }
    }
]);