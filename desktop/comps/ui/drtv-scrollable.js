'use strict';

angular.module('cmDesktopUi').directive('cmScrollable',[
    '$rootScope','$window',
    function ($rootScope, $window) {
        return {
            restrict: 'E',
            link: function (scope, element) {
                $rootScope.$emit('cm-scrollable:loaded')

                /**
                 * Function returns a reference of requested parent element.
                 * @param {String} tag_name Tag name of requested parent element.
                 * @param {HTMLElement} el Initial element (from which search begins).
                 */
                function findParent (tag_name, el) {
                    // loop up until parent element is found
                    while (el && el.nodeName !== tag_name) {
                        el = el.parentNode;
                    }
                    // return found element
                    return el;
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

                function resize(){
                    var column = findParent('CM-COLUMN',element[0]);
                    console.log('column', column)
                    var offset = getOffsetSum(element[0])
                    console.log('offset', offset.top)


                    //var newHeight = ($window.innerHeight - ($window.document.querySelector('cm-header').offsetHeight * 2) - $window.document.querySelector('cm-footer').offsetHeight);
                    var newHeight = ($window.innerHeight - (offset.top - $window.document.querySelector('cm-footer').offsetHeight));
                    element.css({'height':newHeight + 'px'})
                }

                resize();

                angular.element($window).on('resize',resize);

                scope.$on('$destroy', function(){
                    angular.element($window).off('resize',resize);
                })
            }
        }
    }
]);