'use strict';

angular.module('cmUi').directive('cmSearchInContactsBtn',[
    function (){
        return {
            restrict: 'A',
            scope: {
              filter: "=cmFilter"
            },
            link: function(scope, element){

                function updateElement(filter){
                    if(typeof filter == 'string' && filter != ''){
                        element.addClass('cm-show');
                    } else {
                        element.removeClass('cm-show');
                    }
                }

                updateElement(scope.filter);

                var listener = scope.$watch('filter', function(){
                    updateElement(scope.filter);
                });

                scope.$on('$destroy', function(){
                   listener();
                });
            }
        }
    }
]);