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

                //if('cmWithoutFooterCheck' in attrs)
                //    return false;
                //
                //function checkFooter(){
                //    if(element.find('cm-footer').length == 0)
                //        element.addClass('without-footer');
                //    else
                //        element.removeClass('without-footer');
                //}
                //
                //checkFooter();
                //
                //var watchersEnd = $rootScope.$on('cmFooter:stateChanged',function(){
                //    $timeout(function(){
                //        checkFooter();
                //    },50);
                //});
                //
                //scope.$on('$destroy', function(){
                //    watchersEnd();
                //});

                scope.$on('$destroy', function(){
                    listen_to_scrollable();
                });
            }
        }
    }
]);