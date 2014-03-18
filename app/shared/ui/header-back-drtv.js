'use strict';

function cmHeaderBack($window, $location){
    return {
        scope: true,
        template: '<i class="fa cm-left" ng-show="isVisible"></i>'+
                  '<span ng-if="pageTitle">{{pageTitle}}</span>',
        controller: function($rootScope, $scope, $element, $attrs){
            // vars
            $scope.isVisible = $rootScope.urlHistory.length > 1 ? true : false;
            $scope.pageTitle = '';
            $scope.fakeBack = '';
            // check page-title attribute in directive
            if('pageTitle' in $attrs){
                $scope.pageTitle = $scope.$eval($attrs.pageTitle);
            }
            // check default back-to attribute
            if('backTo' in $attrs){
                $scope.backTo = $attrs.backTo;
                $scope.isVisible = true;
            }
            // bind click event
            $element.bind('click', function(){
                // if history has more then one index
                if($rootScope.urlHistory.length > 0){
                    $window.history.back();
                // if is set an default path in route
                } else if($scope.backTo != ''){
                    $location.path($scope.backTo);
                    $scope.$apply();
                }
            });
        }
    }
}