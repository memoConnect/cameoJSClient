'use strict';

angular.module('cmUi').directive('cmStayInViewport',[
    '$window',
    function ($window){
        return {
            restrict: 'A',
            link: function(scope, element){
                // hide image for hidden scale operation
                element.css('visibility','hidden');

                element.on('load', function(){
                    var viewport = {
                        w:$window.innerWidth,
                        h:$window.innerHeight
                    };
                    var image = {
                        w:element[0].width,
                        h:element[0].height
                    };
                    // calc height if greater than viewport
                    if(image.h > viewport.h){
                        element.css('height',(viewport.h-20)+"px");
                    } else {
                        element.css('height',image.h+"px");
                    }
                    // show image
                    element.css('visibility','visible');
                });
            }
        }
    }
]);