'use strict';

angular.module('cmAppUi')
.directive('cmHeaderListSearch',[
    'cmFilter',
    function (cmFilter){
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
                        ' cm-visible="visible"' +
                        ' cm-options="{hideElements:\'cm-footer\',scrollTo:options.scrollTo}"' +
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
                        var input = $element[0].querySelector('#inp-list-search');
                        input.focus();
                    } else {
                        /* if visibility is hidden, filter will be cleared */
                        $scope.ngModel = '';
                        cmFilter.clear();
                    }
                };


                if(cmFilter.getSearchVisibility()){
                    $scope.visible = true;
                    var input = $element[0].querySelector('#inp-list-search');
                    input.focus();
                }

                var filter = cmFilter.get();
                if(typeof filter == 'string' && filter != ''){
                    $scope.visible = true;
                    $scope.ngModel = filter;
                } else {
                    if($scope.visible){
                        $scope.ngModel = '';
                    }
                }
            }
        }
    }
]);