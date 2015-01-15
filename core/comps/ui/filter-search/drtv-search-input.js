'use strict';

angular.module('cmUi').directive('cmSearchInput',[
    'cmFilter',
    '$document',
    '$rootScope',
    function(cmFilter, $document, $rootScope){
        return {
            restrict: 'E',
            scope: {
                search: '=ngModel',
                cmOptions: '=cmOptions',
                visible: '=cmVisible'
            },
            template:   '<i class="fa cm-left" ng-click="close()" data-qa="btn-close-search"></i>' +
                        '<input data-qa="inp-list-search" id="inp-list-search" name="inp-list-search" type="text" value="" ng-model="search" placeholder="{{placeholder}}">' +
                        '<i data-qa="btn-list-search-clear" class="fa toggle-btn" ng-click="clickToogleBtn()" ng-class="{\'cm-search\':showDefaultIcon && counterKeydown == 0,\'cm-checkbox-wrong\':counterKeydown > 0}"></i>',
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
                    cmFilter.set(scope.search);

                    if(scope.search == ''){
                        scope.counterKeydown = 0;
                        scope.$apply();
                    }
                    // on search jump to anchor
                    if(scope.options.scrollTo){
                        $rootScope.$broadcast('scroll:to');
                    }
                });

                if(scope.options.hideElements){
                    var input = angular.element(element[0].querySelector('input')),
                        elementsToHide = angular.element($document[0].querySelectorAll(scope.options.hideElements));

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
                // options for drtv
                $scope.options = angular.extend({}, {
                    withoutSearchIcon:false,
                    hideElements:undefined,
                    scrollTo:undefined
                }, $scope.cmOptions || {});

                $scope.counterKeydown = 0;

                $scope.showDefaultIcon = true;

                if($scope.options.withoutSearchIcon){
                    $scope.showDefaultIcon = false
                }

                $scope.clear = function(){
                    $scope.search = '';
                    $scope.counterKeydown = 0;
                    cmFilter.clear();
                };

                $scope.close = function(){
                    $scope.clear();
                    $scope.visible = false;
                };

                $scope.clickToogleBtn = function(){
                    if(angular.element($element[0].querySelector('i.toggle-btn')).hasClass('cm-search')){
                        $scope.close();
                    } else {
                        $scope.clear();
                    }
                }
            }
        }
    }
]);