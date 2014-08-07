'use strict';

angular.module('cmUi')
.directive('cmFirstOfRepeat',[
    function (){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                if(scope.$first){
                    scope.$eval(attrs.cmFirstOfRepeat);
                }
            }
        }
    }
]);