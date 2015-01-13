'use strict';

angular.module('cmUi')
.directive('cmPinchAndPan',[
    'cmPinchAndPan',
    function (cmPinchAndPan){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                cmPinchAndPan.init({initOnFullscreen:true},element);

                scope.$on('$destroy',function(){
                    cmPinchAndPan.destroy(element);
                });
            }
        }
    }
]);