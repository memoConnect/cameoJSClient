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

                $scope.goToSettingsPage = function($event, pageUrl, isDisabled){
                    if(typeof pageUrl !== 'undefined' && isDisabled == undefined){
                        $event.stopPropagation();
                        $event.preventDefault();
                        $location.path('/settings/'+pageUrl);
                    }
                }
            }
        }
    }
]);