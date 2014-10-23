'use strict';

angular.module('cmWidgets').directive('cmWidgetSettingsList', [
    'cmUserModel', 'cmConfig', 'cmUtil',
    '$window', '$location',
    function(cmUserModel, cmConfig, cmUtil,
             $window, $location){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-list.html',
            controller: function ($scope) {
                $scope.overview = cmConfig.routeSettings;

                $scope.Object = Object;

                $scope.logout = function(){
                    cmUserModel.doLogout(true,'settings overview logout');
                };

                $scope.goToSettingsPage = function($event, pageUrl, isDisabled, route){

                    if('link' in route){
                        // file:///android_asset/www/index.html#/login
                        if(cmUtil.startsWith($location.$$absUrl, 'file:///')) {
                            $window.location = route.link;
                        // http://localhost:8000/app/#/settings
                        } else if($location.$$absUrl.indexOf('/#/') != -1) {
                            var arr_location = $location.$$absUrl.split('/#/');
                            location.href = arr_location[0] + '/' + route.link;
                        }

                        return false;
                    }

                    if(typeof pageUrl !== 'undefined' && isDisabled == undefined){
                        $event.stopPropagation();
                        $event.preventDefault();
                        $scope.goTo('/settings/'+pageUrl);
                    }
                };

                $scope.checkActive = function(page){
                    if($location.$$url.indexOf(page) != -1){
                        return true;
                    }

                    return false;
                };

            }
        }
    }
]);