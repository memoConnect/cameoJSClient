'use strict';

angular.module('cmDesktopUi').directive('cmScrollable',[
    'cmUtil',
    '$rootScope','$window','$timeout',
    function (cmUtil,
              $rootScope, $window, $timeout) {
        return {
            restrict: 'E',
            link: function (scope, element, attrs) {

                var footer = attrs.cmData || 'cm-footer';

                $rootScope.$emit('cmScrollable:loaded');

                function resize(){
                    $timeout(function(){
                        var offset = cmUtil.getOffsetToBody(element[0]),
                            //footerElement = $window.document.querySelector(footer),
                            footerElement = element[0].nextSibling,
                            newHeight = ($window.innerHeight - offset.top - (footerElement ? footerElement.offsetHeight : 0));

                        element.css('height', newHeight + 'px');

                    },100);
                }

                resize();

                angular.element($window).on('resize',resize);

                if('ngShow' in attrs){
                    var killWatcher = scope.$watch(attrs.ngShow, function(ngShow){
                        if(ngShow)
                            resize();
                    });
                }

                scope.$on('$destroy', function(){
                    if(killWatcher)
                        killWatcher();
                    angular.element($window).off('resize',resize);
                });
            }
        }
    }
]);