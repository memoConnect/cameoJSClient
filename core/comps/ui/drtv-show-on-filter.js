'use strict';

angular.module('cmUi').directive('cmShowOnFilter',[
    'cmFilter',
    function (cmFilter){
        return {
            restrict: 'A',
            scope: {
                filter: "=cmFilter"
            },
            link: function(scope, element, attrs){

                function updateElement(filter){

                    if(typeof attrs.cmShowOnEmptyList != 'undefined' && cmFilter.getResultLength() > 0){
                        if(element.hasClass('cm-show')){
                            element.removeClass('cm-show');
                        }

                        return false;
                    }

                    if(typeof filter == 'string' && filter != ''){
                        if(!element.hasClass('cm-show')) {
                            element.addClass('cm-show');
                        }
                    } else {
                        if(element.hasClass('cm-show')){
                            element.removeClass('cm-show');
                        }
                    }
                }

                updateElement(scope.filter);

                var filterListener = scope.$watch('filter', function(){
                    updateElement(scope.filter);
                });

                scope.$on('$destroy', function(){
                    filterListener();
                });
            }
        }
    }
]);