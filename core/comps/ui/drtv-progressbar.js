'use strict';

/**
 * @ngdoc directive
 * @name cmUi.directive:cmProgressbar
 * @description
 * Handle a percentage of anything.
 *
 * @restrict E
 * @example
<example module="cmDemo">
    <file name="style.css">
         cm-progressbar {
          display: block;
          width: 100%;
          min-height: 4rem;
        }
         cm-progressbar .percent {
          font-size: 2rem;
          text-align: center;
          color: #02bed2;
          line-height: 4rem;
        }
         cm-progressbar .percent span {
          display: inline-block;
          font-size: 1.2rem;
        }
         cm-progressbar .progressbar {
          height: 0.1em;
          background: #02bed2;
        }
    </file>
    <file name="script.js">
        angular.module('cmDemo', ['cmUi'])
        .controller('Ctrl', function ($scope) {
            $scope.percent = 0;
            $scope.percentHundretTimes = 0;

            $scope.setPercent = function(percent){
                $scope.percent = percent/100;
                $scope.percentHundretTimes = percent;
            }
        });
    </file>
    <file name="index.html">
        <div ng-controller="Ctrl">
            <button ng-click="setPercent(0)">0%</button>
            <button ng-click="setPercent(15)">15%</button>
            <button ng-click="setPercent(30)">30%</button>
            <button ng-click="setPercent(45)">45%</button>
            <button ng-click="setPercent(60)">60%</button>
            <button ng-click="setPercent(75)">75%</button>
            <button ng-click="setPercent(90)">90%</button>
            <button ng-click="setPercent(100)">100%</button>
            <button ng-click="setPercent(120)">120%</button>
            <br />

            percentHundretTimes: {{percentHundretTimes}}
            <cm-progressbar cm-percent="percentHundretTimes" cm-hundret-times="true"></cm-progressbar>

            percent: {{percent}}
            <cm-progressbar cm-percent="percent"></cm-progressbar>
        </div>
    </file>
</example>
 */

angular.module('cmUi').directive('cmProgressbar',[
    function (){
        return {
            restrict: 'E',
            template: '<div class="percent">{{cmPercent}}<span>%</span></div>' +
                      '<div class="progressbar" style="width:{{cmPercent}}%"></div>',
            controller: function($scope, $element, $attrs) {
                $scope.cmPercent = 0;

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

                        $scope.cmPercent = Math.round(newPercent);
                    })
                }
            }
        }
    }
]);