'use strict';

angular.module('cmUi')
.directive('cmEmojiHandler',[
    '$rootScope',
    function($rootScope){
        return{
            restrict: 'E',
            template: '<i class="fa cm-smile-negative with-cursor" ng-click="toggleList()" cm-reactive></i>',
            scope: true,
            controller: function($scope){
                $scope.toggleList = function(){
                    $rootScope.$broadcast('cmEmojiList:toggle');
                };
            }
        }
    }
]);