'use strict';

angular.module('cmUi').directive('cmStayInViewport',[
    '$window',
    '$timeout',
    function ($window, $timeout){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                // hide image for hidden scale operation
                element.css('visibility','hidden');

                if(attrs.cmSrc) {
                    // set src with delay for showing loader
                    $timeout(function () {
                        element.attr('src', scope[attrs.cmSrc]);
                    }, 1000);
                    // after setted src and image loaded check viewport
                    element.on('load', function () {
                        var viewport = {
                            w: $window.innerWidth,
                            h: $window.innerHeight
                        };
                        var image = {
                            w: element[0].width,
                            h: element[0].height,
                            isPortrait: element[0].height > element[0].width
                        };
                        // calc height if greater than viewport
                        if (image.isPortrait) {
                            element.parent().addClass('is-portrait');
                            if (image.h > viewport.h) {
                                element.css('height', (viewport.h - 150) + 'px');
                                element.css('max-width', 'none');
                            } else {
                                element.css('height', image.h + 'px');
                                element.css('max-width', 'none');
                            }
                        } else {
                            element.parent().addClass('is-landscape');
                            element.css('width', '90%');
                            element.css('max-width', 'none');
                        }
                        // show image and hide loader on scope
                        if (attrs.cmLoadedSpinner) {
                            scope.$apply(function () {
                                scope[attrs.cmLoadedSpinner] = false;
                            });
                        }
                        if (attrs.cmLoadedVisibility) {
                            scope.$apply(function () {
                                scope[attrs.cmLoadedVisibility] = {visibility: 'visible'};
                            });
                        }
                        // show image
                        element.css('visibility', 'visible');
                    });
                }
            }
        }
    }
]);