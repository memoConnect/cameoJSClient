'use strict';

angular.module('cmUi').directive('cmSearchInput',[
    function(){
        return {
            restrict: 'E',
            scope: {
                search: '=ngModel'
            },
            template: '<input type="text" value="" ng-model="search" placeholder="{{placeholder}}" data-qa="input-search">' +
                      '<i class="fa" ng-click="clear()" ng-class="{\'cm-search\':showDefaultIcon && counterKeydown == 0,\'cm-checkbox-wrong\':counterKeydown > 0}"></i>',
            link: function(scope, element, attrs){
                scope.placeholder = attrs.placeholder || '';

                element
                .on('focus', function(){
                    scope.counterKeydown = 0;
                })
                .on('keydown', function(){
                    scope.counterKeydown++;
                })
                .on('keyup', function(){
                    if(scope.search == ''){
                        scope.counterKeydown = 0;
                        scope.$apply();
                    }
                });
            },
            controller: function($scope, $element, $attrs){
                $scope.counterKeydown = 0;

                $scope.showDefaultIcon = true;

                if('cmWithoutSearchIcon' in $attrs && $attrs.cmWithoutSearchIcon){
                    $scope.showDefaultIcon = false
                }

                $scope.clear = function(){
                    $scope.search = '';
                    $scope.counterKeydown = 0;
                }
            }
        }
    }
]);