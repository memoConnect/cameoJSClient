'use strict';

angular.module('cmDesktopUi').directive('cmColumn',[
    '$rootScope',
    function ($rootScope) {
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

                scope.$on('$destroy', function(){
                    listen_to_scrollable();
                });
            }
        }
    }
]);