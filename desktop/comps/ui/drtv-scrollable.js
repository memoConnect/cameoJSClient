'use strict';

angular.module('cmDesktopUi').directive('cmScrollable',[
    'cmUtil',
    '$rootScope','$window','$timeout',
    function (cmUtil,
              $rootScope, $window, $timeout) {
        return {
            restrict: 'E',
            link: function (scope, element, attrs) {

                var footer = attrs.cmData || 'cm-footer',
                    scrollBarHeight = 0;

                $rootScope.$emit('cmScrollable:loaded');

                function resize(){
                    var offset = cmUtil.getOffsetToBody(element[0]),
                        footerElement = $window.document.querySelector(footer),
                        newHeight = ($window.innerHeight - offset.top - (footerElement ? footerElement.offsetHeight : 0) - scrollBarHeight);

                    element.css('height',newHeight + 'px');
                }

                $timeout(function(){
                    resize();
                },50);

                angular.element($window).on('resize',resize);

                scope.$on('$destroy', function(){
                    angular.element($window).off('resize',resize);
                })
            }
        }
    }
]);