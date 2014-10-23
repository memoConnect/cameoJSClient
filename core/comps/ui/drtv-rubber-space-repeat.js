'use strict';

angular.module('cmUi')
.directive('cmRubberSpaceRepeat',[
    '$rootScope',
    function ($rootScope){
        return {
            restrict : 'A',
            link : function(scope) {
                if(scope.$last) {
                    $rootScope.$broadcast('rubberSpace:tighten');
                }
            }
        }
    }
]);