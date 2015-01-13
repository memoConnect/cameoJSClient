'use strict';

angular.module('cmUi')
.directive('cmPinchpanAndZoom',[
    'cmPinchpanAndZoom',
    function (cmPinchpanAndZoom){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                cmPinchpanAndZoom.init({initOnFullscreen:true},element);

                scope.$on('$destroy',function(){
                    cmPinchpanAndZoom.destroy(element);
                });
            }
        }
    }
]);