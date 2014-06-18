'use strict';

angular.module('cmRouteSettings').directive('cmOverviewSettings', [
    'cmUserModel',
    'cmConfig',
    function(cmUserModel,cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-overview.html',
            controller: function ($scope) {

                $scope.overview = cmConfig.routeSettings;
                $scope.Object = Object;

                $scope.logout = function(){
                    cmUserModel.doLogout();
                };
            }
        }
    }
]);