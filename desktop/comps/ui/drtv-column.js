'use strict';

angular.module('cmDesktopUi').directive('cmColumn',[
    '$rootScope', '$timeout',
    function ($rootScope, $timeout) {
        return {
            restrict: 'E',
            link: function(scope, element){
                function addGrabber(){
                    if(element.find('cm-desktop-widget-menu').length == 1)
                        element.append('<div class="grabber"></div>');
                }

                addGrabber();


                function checkFooter(){
                    if(element.find('cm-footer').length == 0)
                        element.addClass('without-footer');
                    else
                        element.removeClass('without-footer');
                }

                checkFooter();

                var watchersEnd = $rootScope.$on('cmFooter:stateChanged',function(){
                    $timeout(function(){
                        checkFooter();
                    },50);
                });

                scope.$on('$destroy', function(){
                    watchersEnd();
                });
            }
        }
    }
]);