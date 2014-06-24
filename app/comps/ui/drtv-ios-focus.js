'use strict';

angular.module('cmUi').directive('cmIosFocus',[
    'cmEnv',
    '$document',
    '$timeout',
    function (cmEnv, $document, $timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                var settings = undefined,
                    fixedElements = undefined,
                    view = undefined,
                    trigger = undefined;

                function stopEvent(e){
                    if(e.target != element[0] && e.target != trigger) {
                        element[0].blur();
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                }

                // Fix mobile floating toolbar when input is focused
                if(cmEnv.isiOS && attrs.cmIosFocus != ''){
                    settings = scope.$eval(attrs.cmIosFocus),
                    fixedElements = angular.element($document[0].querySelectorAll(settings.fixedElements)),
                    view = angular.element($document[0].querySelectorAll('body,html')),
                    trigger = $document[0].querySelector('.post-wrap');

                    element.on('focus', function(event){
                        view.on('touchstart',stopEvent);
                        fixedElements.css('position','absolute');
                        if('scrollTop' in settings && settings.scrollTop) {
                            angular.forEach(view, function (tag) {
                                tag.scrollTop = 0;
                            });
                        }
                    });

                    element.on('blur', function(event){
                        fixedElements.css('position','fixed');
                        view.off('touchstart',stopEvent);
                    });
                }
            }
        }
    }
]);