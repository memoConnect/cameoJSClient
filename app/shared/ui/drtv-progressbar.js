'use strict';

angular.module('cmUi').directive('cmProgressbar',[
    function (){
        return {
            restrict: 'E',
            template: '<div class="percent">{{percent}}<span>%</span></div>' +
                      '<div class="progressbar" style="width:{{percent}}%"></div>',
            controller: function($scope, $element, $attrs){
                $scope.percent = 0;

                $scope.$watch($attrs.cmPercent,function(percent){
                    $scope.percent = Math.round(percent*100);
                })
            }
        }
    }
]);