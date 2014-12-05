'use strict';

angular.module('cmDesktopUi').directive('cmColumn',[
    '$rootScope', '$timeout',
    function ($rootScope, $timeout) {
        return {
            restrict: 'E',
            link: function(scope, element, attrs){
                function addGrabber(){
                    if(element.find('cm-desktop-widget-menu').length == 1)
                        element.append('<div class="grabber"></div>');
                }

                addGrabber();
            }
        }
    }
]);