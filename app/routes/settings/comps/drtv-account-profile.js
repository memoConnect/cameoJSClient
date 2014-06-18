'use strict';

angular.module('cmRouteSettings').directive('cmAccountProfile', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-account-profile.html',
            controller: function ($scope) {
                $scope.identity = cmUserModel.data;
            }
        }
    }
]);