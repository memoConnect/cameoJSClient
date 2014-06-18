'use strict';

/**
 * @ngdoc directive
 * @name cmUi.directive:cmAdaptiveChange
 * @description
 * Inputs with this directive will not update the scope on simple keydown-events.<br />
 * Only after a delay of 500 milliseconds.
 *
 * @restrict A
 * @element input
 * @requires ngModel
 * @requires $timeout
 *
 * @example
    <example module="cmDemo">
        <file name="script.js">
            angular.module('cmDemo', ['cmUi'])
            .controller('Ctrl', function ($scope) {
                $scope.model = '';
            });
        </file>
        <file name="index.html">
            <div ng-controller="Ctrl">
                <input type="text" cm-adaptive-change ng-model="model" placeholder="after 500ms the input will applyed the scope" style="width:100px" /><br />
                input value ><strong>{{model||'empty'}}</strong><
            </div>
        </file>
    </example>
 */

angular.module('cmUi').directive('cmAdaptiveChange', [
    '$timeout',
    function ($timeout){
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: false,
            link: function(scope, element, attrs, ngModelCtrl){
                var timeout;
                element
                .unbind('input')
                .unbind('keydown')
                .on('keydown', function(){
                    // clear exists timeout
                    if(timeout)
                        $timeout.cancel(timeout);
                    // create new timeout
                    timeout = $timeout(function(){
                        scope.$apply(function() {
                            ngModelCtrl.$setViewValue(element.val());
                        });
                    },500);
                });
            }
        }
    }
]);