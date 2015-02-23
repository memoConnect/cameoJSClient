'use strict';

angular.module('cmCore')
.directive('cmNotifySignal', [
    'cmNotify',
    function (cmNotify) {
        return {
            restrict: 'E',
            template: '<i class="fa with-response" ng-class="{\'cm-menue-bell cm-orange\': ring, \'cm-menu\': !ring}"></i>',
            scope: true,
            controller: function ($scope) {
                $scope.ring = false;

                function init(){
                    if(cmNotify.isBimmel()){
                        $scope.ring = true;
                    }
                }

                cmNotify.on('bell:ring', function(){
                    if(cmNotify.isBimmel()){
                        $scope.ring = true;
                    }
                });

                cmNotify.on('bell:unring', function(){
                    $scope.ring = false;
                });

                init();
            }
        }
    }
]);