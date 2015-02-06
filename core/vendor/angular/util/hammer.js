/*
 * angular-hammer v1.2.4
 * (c) 2013 Monospaced http://monospaced.com
 * License: MIT
 */

(function(window, angular, Hammer){

    var hmTouchEvents = angular.module('cmTouchEvents', []),
        hmGestures = ['cmHold:hold',
            'cmTap:tap',
            'cmPress:press',
            'cmDoubletap:doubletap',
            'cmDrag:drag',
            'cmDragstart:dragstart',
            'cmDragend:dragend',
            'cmDragup:dragup',
            'cmDragdown:dragdown',
            'cmDragleft:dragleft',
            'cmDragright:dragright',
            'cmSwipe:swipe',
            'cmSwipeup:swipeup',
            'cmSwipedown:swipedown',
            'cmSwipeleft:swipeleft',
            'cmSwiperight:swiperight',
            'cmTransform:transform',
            'cmTransformstart:transformstart',
            'cmTransformend:transformend',
            'cmRotate:rotate',
            'cmPinch:pinch',
            'cmPinchin:pinchin',
            'cmPinchout:pinchout',
            'cmTouch:touch',
            'cmRelease:release'];

    angular.forEach(hmGestures, function(name){
        var directive = name.split(':'),
            directiveName = directive[0],
            eventName = directive[1];

        hmTouchEvents.directive(directiveName, ['$parse', '$window', function($parse, $window){
            return {
                restrict: 'A, C',
                link: function(scope, element, attr) {
                    var expr = $parse(attr[directiveName]),
                        fn = function(event){
                            scope.$apply(function() {
                                expr(scope, {$event: event});
                            });
                        },
                        opts = $parse(attr['cmOptions'])(scope, {}),
                        hammer;

                    if (typeof Hammer === 'undefined' || !$window.addEventListener) {
                        // fallback to mouse events where appropriate
                        if (directiveName === 'cmTap') {
                            element.bind('click', fn);
                        }
                        if (directiveName === 'cmDoubletap') {
                            element.bind('dblclick', fn);
                        }
                        return;
                    }

                    // don't create multiple Hammer instances per element
                    if (!(hammer = element.data('hammer'))) {
                        hammer = Hammer(element[0], opts);
                        element.data('hammer', hammer);
                    }

                    // bind Hammer touch event
                    hammer.on(eventName, fn);

                    // unbind Hammer touch event
                    scope.$on('$destroy', function(){
                        hammer.off(eventName, fn);
                    });
                }
            };
        }]);
    });

})(window, window.angular, window.Hammer);