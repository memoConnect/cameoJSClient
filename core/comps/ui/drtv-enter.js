'use strict';

angular.module('cmUi')
.directive('cmEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.cmEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
    };
});