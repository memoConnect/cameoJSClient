'use strict';

angular.module('cmWidgets')
.directive('cmWidgetSettingsNotify', [
    'cmSettings', 'cmPushNotificationAdapter', 'cmDevice',
    function(cmSettings, cmPushNotificationAdapter, cmDevice){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-notify.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.isApp = function(){
                    return cmDevice.isApp();
                };

                $scope.changePushNotifications = false;
                $scope.changeBrowserNotifications = false;

                $scope.handlePushNotifications = function() {
                    var key = 'pushNotifications';

                    if(!$scope.isApp() || $scope.changePushNotifications)
                        return false;

                    $scope.changePushNotifications = true;

                    var newValue = $scope.settings[key] ? false : true;

                    if(!newValue){//unregister checked to unchecked
                        cmPushNotificationAdapter.deleteDevice();
                        cmPushNotificationAdapter.one('device:unregistrated',function(){
                            $scope.changePushNotifications = false;
                        });
                    } else {
                        cmPushNotificationAdapter.registerDevice();
                        cmPushNotificationAdapter.one('device:registrated',function(){
                            $scope.changePushNotifications = false;
                        });
                    }

                    if(cmSettings.set(key, newValue)){
                        $scope.settings[key] = newValue;
                    }
                };

                $scope.handleBrowserNotifications = function() {
                    var key = 'browserNotifications';

                    if($scope.isApp() || $scope.changeBrowserNotifications)
                        return false;

                    $scope.changeBrowserNotifications = true;

                    var newValue = $scope.settings[key] ? false : true;

                    if(!newValue){//unregister checked to unchecked
                        //cmPushNotificationAdapter.deleteDevice();
                        //cmPushNotificationAdapter.one('device:unregistrated',function(){
                        //    $scope.changeBrowserNotifications = false;
                        //});
                    } else {
                        //cmPushNotificationAdapter.registerDevice();
                        //cmPushNotificationAdapter.one('device:registrated',function(){
                        //    $scope.changeBrowserNotifications = false;
                        //});
                    }

                    if(cmSettings.set(key, newValue)){
                        $scope.settings[key] = newValue;
                    }
                };
            }
        }
    }
]);