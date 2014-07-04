'use strict';

angular.module('cmUi').directive('cmSearchInput',[
    '$document',
    function($document){
        return {
            restrict: 'E',
            scope: {
                search: '=ngModel'
            },
            template: '<input data-qa="inp-list-search" id="inp-list-search" type="text" value="" ng-model="search" placeholder="{{placeholder}}">' +
                      '<i class="fa" ng-click="clear()" ng-class="{\'cm-search\':showDefaultIcon && counterKeydown == 0,\'cm-checkbox-wrong\':counterKeydown > 0}"></i>',
            link: function(scope, element, attrs){
                scope.placeholder = attrs.placeholder || '';
                // wrapper events
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

                if('cmHideElements' in attrs){
                    var input = angular.element(element[0].querySelector('input')),
                        elementsToHide = angular.element($document[0].querySelectorAll(attrs.cmHideElements));

                    input
                    .on('focus', function(){
                        elementsToHide.addClass('ng-hide');
                    })
                    .on('blur', function(){
                        elementsToHide.removeClass('ng-hide');
                    })
                }
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