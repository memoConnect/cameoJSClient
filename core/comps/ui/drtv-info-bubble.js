'use strict';

angular.module('cmUi')
.directive('cmInfoBubble',[
    function (){
        return {
            restrict: 'AE',
            transclude: true,

            template: '<div ng-transclude></div>' +
                      '<i class="fa {{nose_icon}}"></i>',

            link: function(scope, element, attrs){
                scope.nose_icon = 'cm-nose-up';

                if(attrs.nosePos == 'bottom')
                    scope.nose_icon = 'cm-nose-down';

                element.toggleClass('up',   scope.nose_icon == 'cm-nose-up');
                element.toggleClass('down', scope.nose_icon == 'cm-nose-down');

                element.children('i.').css({
                    top     : attrs.nosePos == 'bottom' ? 'auto': '-3.5rem',
                    bottom  : attrs.nosePos == 'bottom' ? '-1em' : 'auto',
                    left    : attrs.noseX || '70%'
                });
            }
        }
    }
]);