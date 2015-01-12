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
                ngModel: '=ngModel',
                cmOptions: '=cmOptions'
            },
            template: '<i class="fa with-response cm-search"' +
                        ' ng-click="toggleInput($event)"' +
                        ' data-qa="btn-header-list-search" cm-reactive></i>' +
                      '<cm-search-input' +
                        ' ng-model="ngModel"' +
                        ' cm-options="{withoutSearchIcon:true,hideElements:\'cm-footer\',scrollTo:options.scrollTo}"' +
                        ' ng-class="{visible:visible}"></cm-search-input>',
            controller: function($scope, $element, $attrs){
                // option for drtv
                $scope.options = angular.extend({}, {
                    scrollTo:false
                }, $scope.cmOptions || {});

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
                };

                if(typeof $rootScope.defaultFilterString == 'string' && $rootScope.defaultFilterString != ''){
                    $scope.visible = true;
                    $scope.ngModel = $rootScope.defaultFilterString;

                    $rootScope.defaultFilterString = '';
                }
            }
        }
    }
]);