'use strict';

angular.module('cmUi').directive('cmView', [
    'cmUserModel',
    '$injector',
    function (cmUserModel,
              $injector){
        return {
            restrict: 'A',
            controller: function($scope){
                var $route = $injector.get('$route')

                $scope.css = $route.current.$$route.css;

                if(cmUserModel.isGuest() !== false && $route.current.$$route.guests !== true){
                    cmUserModel.doLogout(true,'drtv-view only for guests');
                }
            }
        }
    }
]);