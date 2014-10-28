'use strict';

/**
 * @ngdoc directive
 * @name cmUi.directive:cmFooter
 * @description
 * Footer navigation
 *
 * @restrict E
 * @requires $location
 * @requires cmTranslate
 *
 * @example
 */

angular.module('cmUi')
.directive('cmFooter',[
    '$rootScope',
    function ($rootScope){
        return {
            restrict: 'E',
            controller: function($scope){
                $rootScope.$broadcast('cmFooter:stateChanged','show');
                $scope.$on('$destroy', function(){
                    $rootScope.$broadcast('cmFooter:stateChanged','hide');
                });
            }
        }
    }
]);