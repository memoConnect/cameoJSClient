'use strict';

angular.module('cmUi')
.directive('cmImageLoaded', [
    '$parse',
    function($parse){

    return {
        restrict: 'A',
        compile: function($element, attr) {
            var fn = $parse(attr['cmImageLoaded']);

            return function(scope, element, attr) {
                element.on('load', function(event) {
                    scope.$apply(function() {
                        fn(scope, {$event:event});
                    });
                });
            };

        }
    };
}]);