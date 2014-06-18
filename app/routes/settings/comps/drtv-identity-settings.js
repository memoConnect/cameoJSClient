'use strict';

angular.module('cmRouteSettings').directive('cmIdentitySettings', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-identity-settings.html',
            controller: function ($scope) {
                $scope.identity = cmUserModel.data;
            }
        }
    }
]);