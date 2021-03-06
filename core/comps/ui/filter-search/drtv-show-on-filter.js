'use strict';

angular.module('cmUi').directive('cmShowOnFilter',[
    'cmFilter',
    function (cmFilter){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                function updateElement(filter){
                    if(typeof attrs.cmShowOnEmptyList != 'undefined' && cmFilter.getResultLength() > 0){
                        if(element.hasClass('cm-show')){
                            element.removeClass('cm-show');
                        }

                        return false;
                    }

                    if(typeof attrs.cmShowOnMinLength != 'undefined' && typeof filter == 'string' && filter.length < attrs.cmShowOnMinLength){
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

                function onClearFilter(){
                    if(element.hasClass('cm-show')){
                        element.removeClass('cm-show');
                    }
                }

                cmFilter.onClear('showOnFilter',onClearFilter);

                var filterListener = scope.$watch(attrs.cmShowOnFilter, function(filter){
                    updateElement(filter);
                });

                scope.$on('$destroy', function(){
                    filterListener();
                });
            }
        }
    }
]);