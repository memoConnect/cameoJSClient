'use strict';

angular.module('cmUi').directive('cmBack',[
    'cmHistory',
    '$rootScope',
    function (cmHistory,
              $rootScope){
        return {
            restrict: 'AE',
            scope: {
                pageTitle: '=pageTitle'
            },
            template: '<div class="back-wrap" ng-click="goBack()" cm-reactive>'+
                        '<i class="fa with-response cm-left" ng-show="isVisible"></i>'+
                        '<span ng-if="pageTitle">{{pageTitle | cmTranslate}}</span>'+
                      '</div>',
            controller: function($scope, $element, $attrs){
                // vars
                $scope.isVisible = !cmHistory.isEmpty() ? true : false;
                //$scope.pageTitle = $attrs.pageTitle;
                $scope.fakeBack = '';
                // check default back-to attribute
                if('backTo' in $attrs){
                    $scope.backTo = $attrs.backTo;
                    $scope.isVisible = true;
                }

                $scope.goBack = function(){
                    // if history has more then one index
                    if(!cmHistory.isEmpty() && ('plainBack' in $attrs) == false){
                        $rootScope.goBack();
                        // if is set an default path in route
                        return false;
                    }

                    if($scope.backTo != ''){
                        $rootScope.goTo($scope.backTo);
                        return false;
                    }
                }
            }
        }
    }
]);