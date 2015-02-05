'use strict';

angular.module('cmUi')
.directive('cmEnter', [
    function() {
        return function(scope, element, attrs) {

            function onEnter(event){
                if(event.keyCode === 13) {
                    scope.$broadcast('cmEnter:pressed');
                    scope.$apply(function(){
                        scope.$eval(attrs.cmEnter, {'event': event});
                    });

                    event.preventDefault();
                }
            }

            element.on('keydown', onEnter);
            element.on('keypress', onEnter);

            scope.$on('$destroy', function(){
                element.off('keydown');
                element.off('keypress');
            })
        };
    }
]);