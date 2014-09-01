'use strict';

angular.module('cmUi').directive('cmBack',[
    '$rootScope',
    '$window',
    function ($rootScope, $window){
        return {
            restrict: 'AE',
            scope: {
                pageTitle: '=pageTitle'
            },
            template: '<div class="back-wrap" ng-click="goBack()">'+
                        '<i class="fa with-response cm-left" ng-show="isVisible"></i>'+
                        '<span ng-if="pageTitle">{{pageTitle | cmTranslate}}</span>'+
                      '</div>',
            controller: function($scope, $element, $attrs){
                // vars
                $scope.isVisible = $rootScope.urlHistory.length > 1 ? true : false;
                //$scope.pageTitle = $attrs.pageTitle;
                $scope.fakeBack = '';
                // check default back-to attribute
                if('backTo' in $attrs){
                    $scope.backTo = $attrs.backTo;
                    $scope.isVisible = true;
                }

                $scope.goBack = function(){
                    // if history has more then one index
                    if($rootScope.urlHistory.length > 0 && ('plainBack' in $attrs) == false){
                        $window.history.back();
                        // if is set an default path in route
                    } else if($scope.backTo != ''){
                        $scope.goto($scope.backTo);
                    }
                }
            }
        }
    }
]);