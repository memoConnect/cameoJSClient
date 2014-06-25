'use strict';

angular.module('cmUi').directive('cmIosFocus',[
    'cmEnv',
    '$document',
    '$rootScope',
    function (cmEnv, $document, $rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                var settings = undefined,
                    fixedElements = undefined,
                    view = undefined,
                    handler = undefined;

                function stopEvent(e){
                    if(e.target != element[0] && e.target != handler) {
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
                    handler = $document[0].querySelector(settings.handler);

                    element.on('focus', function(event){
                        $rootScope.$broadcast('cmIosFocus:focus',element);
                        view.on('touchstart',stopEvent);
                        fixedElements.css('position','absolute');
                        if('scrollTop' in settings && settings.scrollTop) {
                            angular.forEach(view, function (tag) {
                                tag.scrollTop = 0;
                            });
                        }
                    });

                    element.on('blur', function(event){
                        $rootScope.$broadcast('cmIosFocus:blur');
                        fixedElements.css('position','fixed');
                        view.off('touchstart',stopEvent);
                    });
                } else {
                    element.on('focus', function(event){
                        $rootScope.$broadcast('cmIosFocus:focus',element);
                    });
                    element.on('blur', function(event){
                        $rootScope.$broadcast('cmIosFocus:blur');
                    });
                }
            }
        }
    }
]);