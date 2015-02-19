'use strict';

angular.module('cmDesktopUi')
.directive('cmBubbleScrollToScrollable',[
    'cmLogger',
    '$document',
    function(cmLogger,
             $document) {
        return {
            restrict: 'A',
            link: function(scope, element){
                function bubbleScroll(event){
                    var scrollElement = $document[0].querySelectorAll('cm-scrollable');

                    if(scrollElement.length == 0)
                        return false;

                    if(scrollElement.length > 1){
                        cmLogger.warn('cmBubbleScrollToScrollable detects more than one cmScrollable')
                    }

                    // down
                    if('wheelDelta' in event && event.wheelDelta < 0 // ie, opera, safari
                    || 'detail' in event && event.detail > 0 // firefox
                    ) {
                        scrollElement[0].scrollTop = scrollElement[0].scrollTop + 25;
                    // up
                    } else {
                        scrollElement[0].scrollTop = scrollElement[0].scrollTop - 25;
                    }
                }

                element.on('mousewheel DOMMouseScroll', bubbleScroll);
                scope.$on('$destroy', function(){
                    element.off('mousewheel DOMMouseScroll', bubbleScroll);
                });
            }
        }
    }
]);