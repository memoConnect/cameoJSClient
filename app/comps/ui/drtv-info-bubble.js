'use strict';

angular.module('cmUi').directive('cmInfoBubble',[
    '$document',
    function ($document){
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

                function getOffsetSum(elem) {
                    var top=0, left=0;
                    while(elem) {
                        top = top + parseInt(elem.offsetTop);
                        left = left + parseInt(elem.offsetLeft);
                        elem = elem.offsetParent;
                    }
                    return {top: top, left: left};
                }

                scope.$watch(attrs.ngShow, function(bool) {
                    if (bool && bool != false) {

                        var offset = getOffsetSum(element[0])

                        var bodyAndHtml = angular.element($document[0].querySelectorAll('body,html')),
                            cmHeader = angular.element($document[0].querySelector('cm-header'))
                        angular.forEach(bodyAndHtml, function (tag) {
                            tag.scrollTop = offset.top - cmHeader[0].offsetHeight;
                        });
                    }
                });
            }
        }
    }
]);