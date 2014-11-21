'use strict';

//https://github.com/fatlinesofcode/ngDraggable/blob/master/ngDraggable.js

angular.module('cmDesktopUi')
.directive('cmDragResize',[
    '$document',
    function ($document) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs){

                function getOffsetSum(elem) {
                    var top=0, left=0;
                    while(elem) {
                        top = top + parseInt(elem.offsetTop);
                        left = left + parseInt(elem.offsetLeft);
                        elem = elem.offsetParent;
                    }
                    return {top: top, left: left};
                }

                var targets = $document[0].querySelectorAll(attrs.cmDragResize);
                var default_height = targets[0].offsetHeight;
                var offset = getOffsetSum(targets[0]);
                var dragged = false;
                var startY = 0;

                element.on('mousedown', function(evt){
                    offset = getOffsetSum(targets[0]);
                    startY = evt.y;
                    dragged = true;
                });

                $document.on('mousemove', function(evt){
                    if(dragged) {
                        //console.log(offset.top - evt.y);
                        var difference = (startY - evt.y);
                        var new_height = default_height + difference;
                        console.log(new_height)

                        angular.element(targets[0]).css('height',new_height+'px');
                    }
                });

                $document.on('mouseup', function(evt){
                    dragged = false;
                });
            }
        }
    }
]);