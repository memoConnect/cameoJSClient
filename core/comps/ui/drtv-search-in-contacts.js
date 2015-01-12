'use strict';

angular.module('cmUi').directive('cmSearchInContactsBtn',[
    function (){
        return {
            restrict: 'A',
            scope: {
              filter: "@cmFilter"
            },
            link: function(scope, element){

                function updateElement(filter){
                    if(typeof filter == 'string' && filter != ''){
                        element.css({'display':'block'});
                    } else {
                        element.css({'display':'none'});
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