'use strict';

angular.module('cmUi')
.directive('cmBackground', [
    '$route',
    function ($route){
        return {
            restrict: 'A',
            controller: function($scope, $element){
                $scope.$on('$locationChangeSuccess', function() {
                    if($route.current != undefined){
                        if($route.current.$$route.isDefault){
                            $element.addClass('start-page');
                        } else {
                            $element.removeClass('start-page');
                        }
                    }
                });
            }
        }
    }
]);