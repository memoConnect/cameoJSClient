'use strict';

/**
 * Is now part of cmLoader!
 */


/**
 * @ngdoc directive
 * @name cmUi.directive:cmSpinner
 * @description
 * Creates a spinner with spin.js
 *
 * @example
 <example module="cmDemo">
     <file name="style.css">
         .wrapper{
            height:100px;
         }
         cm-spinner {
          display: block;
          position: relative;
          top: 50%;
          left: 50%;
          width: 1px;
          height: 1px;
        }
     </file>
     <file name="script.js">
        angular.module('cmDemo', ['cmUi'])
        .controller('Ctrl', function ($scope) {
            $scope.showSpinner = true;
            $scope.event = function(name){
                $scope.$broadcast(name);
            }
        });
     </file>
     <file name="index.html">
         <div ng-controller="Ctrl">
            Scope variable:
            <button ng-click="showSpinner=false">hide</button>
            <button ng-click="showSpinner=true">show</button>
            Eventhandling:
            <button ng-click="event('cmSpinner:stop')">trigger stop</button>
            <button ng-click="event('cmSpinner:start')">trigger start</button>

            <div class="wrapper">
                <cm-spinner ng-show="showSpinner"></cm-spinner>
            </div>
            <div class="wrapper">
                <cm-spinner ng-show="showSpinner" cm-color="#ff0000"></cm-spinner>
            </div>
            <div class="wrapper">
                <cm-spinner ng-show="showSpinner" cm-length="2"></cm-spinner>
            </div>
            <div class="wrapper">
                <cm-spinner ng-show="showSpinner" cm-radius="5"></cm-spinner>
            </div>
            <div class="wrapper">
                <cm-spinner ng-show="showSpinner" cm-width="2"></cm-spinner>
            </div>
         </div>
     </file>
 </example>
 */

angular.module('cmUi').directive('cmSpinner',[
    'cmLogger', 
    function (cmLogger){
        return {
            restrict: 'AE',
            template: '<div class="spinner-wrapper" ng-show="loading"><div class="spinner"></div></div>',
            controller: function($scope, $element, $attrs){

                cmLogger.warn('please use cmLoader instead of cmSpinner')

                $scope.loading = false;

                var opts = {};
                if($attrs.cmLength)
                    opts.length = $attrs.cmLength;
                if($attrs.cmRadius)
                    opts.radius = $attrs.cmRadius;
                if($attrs.cmColor)
                    opts.color = $attrs.cmColor;
                if($attrs.cmWidth)
                    opts.width = $attrs.cmWidth;

                var spinner = new Spinner(opts);
                var loadingContainer = angular.element($element[0].querySelector('.spinner'))[0];

                $scope.$watch($attrs.ngShow, function(bool){
                    if(bool != false){
                        spinner = spinner.spin();
                        loadingContainer.appendChild(spinner.el);
                        $scope.loading = true
                    } else {
                        spinner.stop();
                        loadingContainer.innerHTML = '';
                        $scope.loading = false
                    }
                });

                /**
                 * @ngdoc event
                 * @name start
                 * @eventOf cmUi.directive:cmSpinner
                 * @description
                 * $scope.$on('cmSpinner:start',...)
                 */
                $scope.$on('cmSpinner:start', function(){
                    spinner = spinner.spin();
                    loadingContainer.appendChild(spinner.el);
                    $scope.loading = true
                });

                /**
                 * @ngdoc event
                 * @name stop
                 * @eventOf cmUi.directive:cmSpinner
                 * @description
                 * $scope.$on('cmSpinner:stop',...)
                 */
                $scope.$on('cmSpinner:stop', function(){
                    spinner.stop();
                    loadingContainer.innerHTML = '';
                    $scope.loading = false
                });
            }
        }
    }
]);