'use strict';

angular.module('cmUi').directive('cmHideOnFilter',[
    'cmFilter',
    function (cmFilter){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                function updateElement(filter){
                    if(typeof filter == 'string' && filter != ''){
                        if(!element.hasClass('cm-hide')) {
                            element.addClass('cm-hide');
                        }
                    } else {
                        if(element.hasClass('cm-hide')){
                            element.removeClass('cm-hide');
                        }
                    }
                }

                var filterListener = scope.$watch(attrs.cmHideOnFilter, function(filter){
                    updateElement(filter);
                });

                scope.$on('$destroy', function(){
                    filterListener();
                });
            }
        }
    }
]);