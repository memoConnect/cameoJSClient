'use strict';

function cmView($route, $location, cmUserModel){
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