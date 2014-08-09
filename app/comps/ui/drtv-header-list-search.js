'use strict';

angular.module('cmUi')
.directive('cmHeaderListSearch',[
    '$rootScope',
    '$timeout',
    '$document',
    function ($rootScope, $timeout, $document){
        return {
            restrict: 'E',
            scope: {
                ngModel: '=ngModel'
            },
            template: '<i class="fa with-response cm-search" ng-click="toggleInput($event)" data-qa="btn-header-list-search"></i>' +
                      '<cm-search-input ng-model="ngModel" cm-without-search-icon="true" cm-hide-elements="cm-footer" ng-class="{visible:visible}"></cm-search-input>',
            controller: function($scope){
                $scope.visible = false;
                $scope.toggleInput = function(e){
                    e.stopPropagation();
                    e.preventDefault();
                    $scope.visible = $scope.visible ? false : true;
                    // set focus to input
                    if($scope.visible) {
                        var input = $document[0].querySelector('#inp-list-search');
                        input.focus();
                    }
                }
            }
        }
    }
]);