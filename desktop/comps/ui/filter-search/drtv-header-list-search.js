'use strict';

angular.module('cmDesktopUi')
.directive('cmHeaderListSearch',[
    'cmFilter',
    function (cmFilter){
        return {
            restrict: 'E',
            scope: {
                ngModel: '=ngModel',
                cmOptions: '=cmOptions'
            },
            template:   '<cm-search-input' +
                        ' ng-model="ngModel"' +
                        ' cm-options="{scrollTo:options.scrollTo}"' +
                        ' ></cm-search-input>',
            controller: function($scope, $element, $attrs){
                // option for drtv
                $scope.options = angular.extend({}, {
                    scrollTo:false
                }, $scope.cmOptions || {});

                if(cmFilter.getSearchVisibility()){
                    var input = $element[0].querySelector('#inp-list-search');
                    input.focus();
                }

                var filter = cmFilter.get();
                if(typeof filter == 'string' && filter != ''){
                    $scope.ngModel = filter;
                } else {
                    $scope.ngModel = '';
                }
            }
        }
    }
]);