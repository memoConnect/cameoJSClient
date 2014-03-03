define([
    'app'
], function(app){
    'use strict';

    app.register.directive('cmPointSpinner',
    function(cmLogger){
        return {
            scope: true,
            template: '<span ng-show="isIdle" style="width:20px;display:inline-block;text-align:left">{{points}}</span>',
            controller: function($scope, $interval){
                var interval;

                $scope.isIdle = false;
                $scope.points = "";

                $scope.$on('cmPointSpinner:start',function(){
                    $scope.isIdle = true;
                    interval = $interval(function(){
                        $scope.points += ".";

                        if($scope.points.length == 4){
                            $scope.points = "";
                        }
                    },250);
                });

                $scope.$on('cmPointSpinner:cancel',function(){
                    $scope.isIdle = false;
                    $interval.cancel(interval);
                });
            }
        }
    });
});