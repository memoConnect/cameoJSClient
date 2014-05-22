'use strict';

angular.module('cmUi').directive('cmProgressbar',[
    function (){
        return {
            restrict: 'E',
            template: '<div class="percent">{{percent}}<span>%</span></div>' +
                      '<div class="progressbar" style="width:{{percent}}%"></div>',
            controller: function($scope, $element, $attrs) {
                $scope.percent = 0;

                if($attrs.cmPercent){
                    $scope.$watch($attrs.cmPercent, function (newPercent) {
                        // default multiply hundret times
                        if($attrs.cmHundretTimes == undefined){
                            newPercent = newPercent * 100;
                        }

                        // for whatever reason percent over 100%
                        if(newPercent > 100) {
                            newPercent = 100;
                        }

                        $scope.percent = Math.round(newPercent);
                    })
                }
            }
        }
    }
]);