'use strict';

angular.module('cmUi')
.directive('cmHeaderListSearch',[
    '$rootScope',
    '$timeout',
    function ($rootScope, $timeout){
        return {
            restrict: 'E',
            scope: {
                ngModel: '=ngModel'
            },
            template: '<i class="fa cm-search" ng-click="toggleInput()" data-qa="btn-header-list-search"></i>' +
                      '<div ng-show="visible">' +
                        '<cm-search-input ng-model="ngModel" cm-without-search-icon="true" cm-hide-elements="cm-footer"></cm-search-input>' +
                      '</div>',
            controller: function($scope, $element, $attrs){
                $scope.visible = false;
                $scope.toggleInput = function(){
                    $scope.visible = $scope.visible ? false : true;
                    // set focus to input
//                    if($scope.visible){
//                        $timeout(function(){
//                            $element[0].querySelector('input').focus();
//                        },500);
//                    }
                }
            }
        }
    }
]);