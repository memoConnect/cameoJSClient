'use strict';

angular.module('cmUi').directive('cmView', [
    '$route', '$rootScope',
    'cmUserModel',
    function ($route, $rootScope, cmUserModel){
        return {
            restrict: 'A',
            controller: function($scope){
                $scope.css = $route.current.$$route.css;

                if(cmUserModel.isGuest() !== false && $route.current.$$route.guests !== true){
                    cmUserModel.doLogout(true,'drtv-view only for guests');
                }
            }
        }
    }
]);