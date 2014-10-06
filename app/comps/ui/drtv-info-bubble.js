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
                    top     : attrs.nosePos == 'bottom' ? 'auto': '-1em',
                    bottom  : attrs.nosePos == 'bottom' ? '-1em' : 'auto',
                    left    : attrs.noseX || '70%'
                });

                // TODO: jumpto real offset of cm-info-bubble

//                scope.$watch(attrs.ngShow, function(bool) {
//                    if (bool && bool != false) {
//
//                        var offset = element[0].getBoundingClientRect();
//
//                        console.log(offset)
//
//                        var bodyAndHtml = angular.element($document[0].querySelectorAll('body,html'));
//                        angular.forEach(bodyAndHtml, function (tag) {
//                            console.log(tag,offset.top)
//                            tag.scrollTop = offset.top;
//                        });
//                    }
//                });
            }
        }
    }
]);