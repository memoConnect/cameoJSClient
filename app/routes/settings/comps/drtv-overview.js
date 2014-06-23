'use strict';

angular.module('cmRouteSettings').directive('cmOverviewSettings', [
    'cmUserModel',
    'cmConfig',
    '$location',
    function(cmUserModel,cmConfig,$location){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-overview.html',
            controller: function ($scope) {

                $scope.overview = cmConfig.routeSettings;
                $scope.Object = Object;

                $scope.logout = function(){
                    cmUserModel.doLogout();
                };

                $scope.goToSettingsPage = function(page){
                    if(typeof page !== 'undefined'){
                        $location.path('/settings/'+page);
                    }
                }
            }
        }
    }
]);