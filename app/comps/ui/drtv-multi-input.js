'use strict';

angular.module('cmUi').directive('cmMultiInput',[
    '$rootScope',
    function ($rootScope){
        return {
            restrict: 'AE',
            scope: true,
            transclude: true,
            priority: 101,

            //template: '<div ng-repeat="item in collection" class="cm-multi-input-wrap">' +
            //            '<div ng-transclude ng-keyup="showMultiplier()"></div>'+
            //            '<div class="cm-multiplier" ng-click="multiply()" ng-show="isMultiplyable">'+
            //                '<i class="fa cm-checkbox-bg"></i>'+
            //                '<i class="fa cm-checkbox-add"></i>'+
            //            '</div>'+
            //          '</div>',
            template: '<div ng-repeat="item in collection" class="cm-multi-input-wrap">' +
                        '<div ng-transclude ng-keyup="showMultiplier()"></div>'+
                      '</div>',

            controller: function ($scope, $element, $attrs) {
                $scope.collection = [];
                $scope.isMultiplyable = false;

                $scope.$watchCollection($attrs.cmCollection,function(collection) {
                    if(collection != undefined) {
                        $scope.collection = collection;
                        $scope.showMultiplier();
                    }
                });

                $rootScope.$on('multi-input:changed', function(ngModel){
                    $scope.showMultiplier();
                });

                $scope.showMultiplier = function(){
                    var isDisabled = $scope.$eval($attrs.cmDisabled) || false;
                    var last = $scope.collection.length-1;

                    if(isDisabled == false && last > -1 && $scope.collection[last].value != ''){
                        $scope.isMultiplyable = true;
                    } else {
                        $scope.isMultiplyable = false;
                    }
                };

                $scope.multiply = function(){
                    var last = $scope.collection.length-1;
                    // check last item if filled
                    if($scope.collection[last].value != ''){
                        $scope.collection.push({value:''});
                    }
                };
            }
        }
    }
]);