'use strict';

angular.module('cmUi').directive('cmInfoBubble',[
    function (){
        return {
            restrict: 'AE',
            transclude: true,
            scope:      {
                            noseX      :"@",
                            nosePos    :"="
                        },

            template:   '<div ng-transclude></div>'+
                        '<i class="fa {{nose_icon}}"></i>',

            link:       function(scope, element, attrs){
                            scope.nose_icon = 'cm-nose-up'

                            if(scope.nosePos == 'bottom')
                                scope.nose_icon = 'cm-nose-down'

                            element.toggleClass('up',   scope.nose_icon == 'cm-nose-up')
                            element.toggleClass('down', scope.nose_icon == 'cm-nose-down')

                            element.children('i.').css({
                                top     : scope.nosePos == 'bottom' ? 'auto': '-1.05em',
                                bottom  : scope.nosePos == 'bottom' ? '-1.05em' : 'auto',
                                left    : scope.noseX                               
                            })
                        }
        }
    }
]);