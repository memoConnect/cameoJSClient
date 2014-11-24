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

                // just toogle
                var watcher1 = element.on('dblclick', function(){
                    if(lastHeight == maxHeight){
                        updateElement(minHeight);
                        lastHeight = target.offsetHeight;
                    } else {
                        updateElement(maxHeight);
                        lastHeight = target.offsetHeight;
                    }
                });
                // dragging
                var watcher2 = element.on('mousedown', function(evt){
                    offset = getOffsetSum(target);
                    startY = evt.y;
                    dragged = true;
                });
                var watcher3 = $document.on('mousemove', function(evt){
                    if(dragged) {
                        var difference = (startY - evt.y);
                        var possibleHeight = lastHeight + difference;

                        if(possibleHeight < minHeight){
                            possibleHeight = minHeight;
                        } else if(possibleHeight > maxHeight){
                            possibleHeight = maxHeight;
                        }

                        updateElement(possibleHeight);
                    }
                });
                // set for next drag
                var watcher4 = $document.on('mouseup', function(){
                    dragged = false;
                    lastHeight = target.offsetHeight;
                });

                var watcher5 = $rootScope.$on('cmAnswer:reset',function(){
                    updateElement(minHeight);
                });

                scope.$on('$destroy', function(){
                    watcher1();
                    watcher2();
                    watcher3();
                    watcher4();
                    watcher5();
                });
            }
        }
    }
]);