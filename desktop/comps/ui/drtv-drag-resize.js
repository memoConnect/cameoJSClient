'use strict';

//https://github.com/fatlinesofcode/ngDraggable/blob/master/ngDraggable.js

angular.module('cmDesktopUi')
.directive('cmDragResize',[
    '$document', '$rootScope',
    function ($document, $rootScope) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs){

                function findParentForMaxHeight(a, parentForMaxHeight){
                    var els = [], maxHeight = 0,
                        selector = parentForMaxHeight ? parentForMaxHeight.split('.') : '';

                    while (a) {
                        if(selector[0] != '' && a.tagName && a.tagName.toLowerCase() == selector[0]
                        || selector.length > 1 && a.className && a.className.indexOf(selector[1]) >= 0){
                            maxHeight = a.offsetHeight;
                            return maxHeight;
                        }

                        els.unshift(a);
                        a = a.parentNode;
                    }

                    return maxHeight;
                }

                function getOffsetSum(elem) {
                    var top=0, left=0;
                    while(elem) {
                        top = top + parseInt(elem.offsetTop);
                        left = left + parseInt(elem.offsetLeft);
                        elem = elem.offsetParent;
                    }
                    return {top: top, left: left};
                }

                function updateElement(height){
                    angular.element(target).css('height',height+'px');
                }

                var options = scope.$eval(attrs.cmDragResize);
                var target = $document[0].querySelector(options.target);
                var minHeight = target.offsetHeight;
                var maxHeight = findParentForMaxHeight(element[0], options.parentForMaxHeight);
                var lastHeight = minHeight;
                var offset = getOffsetSum(target);
                var dragged = false;
                var startY = 0;


                console.log(target,minHeight,maxHeight)

                // just toogle

                function callback_dblclick(){
                    if(lastHeight == maxHeight){
                        updateElement(minHeight);
                        lastHeight = target.offsetHeight;
                    } else {
                        updateElement(maxHeight);
                        lastHeight = target.offsetHeight;
                    }
                }

                function callback_mousedown(evt){
                    offset = getOffsetSum(target);
                    startY = evt.clientY;
                    dragged = true;
                }

                function callback_mousemove(evt){
                    if(dragged) {
                        var difference = (startY - evt.clientY);
                        var possibleHeight = lastHeight + difference;

                        if(possibleHeight < minHeight){
                            possibleHeight = minHeight;
                        } else if(possibleHeight > maxHeight){
                            possibleHeight = maxHeight;
                        }

                        updateElement(possibleHeight);
                    }
                }

                function callback_mouseup(){
                    if(dragged) {
                        dragged = false;
                        lastHeight = target.offsetHeight;
                    }
                }

                element.on('dblclick', callback_dblclick);
                // dragging
                element.on('mousedown',callback_mousedown);
                $document.on('mousemove',callback_mousemove);
                // set for next drag
                $document.on('mouseup', callback_mouseup);

                var watcher = $rootScope.$on('cmAnswer:reset',function(){
                    updateElement(minHeight);
                });

                scope.$on('$destroy', function(){
                    element.off('dblclick', callback_dblclick);
                    element.off('mousedown',callback_mousedown);
                    $document.off('mousemove',callback_mousemove);
                    $document.off('mouseup', callback_mouseup);
                    watcher();
                });
            }
        }
    }
]);