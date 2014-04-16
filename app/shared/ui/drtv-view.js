'use strict';

angular.module('cmUi').directive('cmView', [
    '$route',
    '$location',
    'cmUserModel',
    function ($route, $location, cmUserModel){
        return {
            restrict: 'A',
            controller: function($scope){
                if(cmUserModel.isGuest() !== false && $route.current.$$route.guests !== true){
                    cmUserModel.doLogout();
                    return false;
                }

                $scope.css = $route.current.$$route.css;
            }
        }
    }
]);