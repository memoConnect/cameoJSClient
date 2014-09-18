'use strict';

angular.module('cmWidgets').directive('cmWidgetSettingsList', [
    'cmUserModel',
    'cmConfig',
    function(cmUserModel, cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-list.html',
            controller: function ($scope) {
                $scope.overview = cmConfig.routeSettings;
                $scope.Object = Object;

                $scope.logout = function(){
                    cmUserModel.doLogout(true,'settings overview logout');
                };

                $scope.goToSettingsPage = function($event, pageUrl, isDisabled){
                    if(typeof pageUrl !== 'undefined' && isDisabled == undefined){
                        $event.stopPropagation();
                        $event.preventDefault();
                        $scope.goTo('/settings/'+pageUrl);
                    }
                }
            }
        }
    }
]);