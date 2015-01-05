'use strict';

angular.module('cmDesktopUi').directive('cmScrollable',[
    '$rootScope','$window',
    function ($rootScope, $window) {
        return {
            restrict: 'E',
            link: function (scope, element) {
                $rootScope.$emit('cm-scrollable:loaded')

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
                    var offset = getOffsetSum(element[0]);
                    var newHeight = ($window.innerHeight - offset.top - $window.document.querySelector('cm-footer').offsetHeight) - 20; // scrollbar
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