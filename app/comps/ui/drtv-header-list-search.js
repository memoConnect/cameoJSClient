'use strict';

angular.module('cmUi')
.directive('cmHeaderListSearch',[
    '$rootScope',
    function ($rootScope){
        return {
            restrict: 'E',
            scope: {
                ngModel: '=ngModel'
            },
            template: '<i class="fa cm-search-cl" ng-click="toggleInput()"></i>' +
                      '<div ng-show="visible">' +
                        '<cm-search-input ng-model="ngModel"></cm-search-input>' +
                      '</div>',
            controller: function($scope, $element, $attrs){
                $scope.visible = false;
                $scope.toggleInput = function(){
                    $scope.visible = $scope.visible ? false : true;
                }
            }
        }
    }
]);