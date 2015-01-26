'use strict';

angular.module('cmDesktopUi').directive('cmColumn',[
    'cmConfig',
    '$rootScope', '$window', '$document',
    function (cmConfig,
              $rootScope, $window, $document) {
        return {
            restrict: 'E',
            link: function(scope, element){
                function handleScrollable(){
                    if(element.find('cm-scrollable').length == 1){
                        element.css({'overflow':'hidden'});
                    }
                }

                var listen_to_scrollable = $rootScope.$on('cmScrollable:loaded', handleScrollable);

                function resize(){
                    var header = $document[0].querySelector('cm-header'),
                        winHeight = $window.innerHeight,
                        children = element.children(),
                        minDim = cmConfig.static.minimumDesktopDimension.split('x'),
                        newHeight = winHeight - header.offsetHeight;

                    // TODO: more than one children!!!
                    if(header && children.length == 1) {
                        children.css({
                            'height': newHeight + 'px',
                            'position': 'relative'
                        });
                    }
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