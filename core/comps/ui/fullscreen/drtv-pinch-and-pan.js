'use strict';

angular.module('cmUi')
.directive('cmPinchAndPan',[
    'cmPinchAndPan',
    function (cmPinchAndPan){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var options = scope.$eval(attrs.cmPinchAndPan);

                cmPinchAndPan.init(options,element);

                scope.$on('$destroy',function(){
                    cmPinchAndPan.destroy(element);
                });
            }
        }
    }
]);