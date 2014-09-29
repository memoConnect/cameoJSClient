'use strict';

angular.module('cmWidgets').directive('cmWidgetNotify', [
    'cmSettings', 'cmPushNotificationAdapter', 'cmDevice',
    '$rootScope',
    function(cmSettings, cmPushNotificationAdapter, cmDevice,
             $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-notify.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.isApp = function(){
                    return cmDevice.isApp();
                };

                $scope.handlePushNotifications = function() {
                    var key = 'pushNotifications';

                    if(!$scope.isApp())
                        return false;

                    var newValue = $scope.settings[key] ? false : true;

                    if(!newValue){//unregister checked to unchecked
                        cmPushNotificationAdapter.deleteDevice();
                    } else {
                        cmPushNotificationAdapter.registerDevice();
                    }

                    if(cmSettings.set(key, newValue)){
                        $scope.settings[key] = newValue;
                    }
                };
            }
        }
    }
]);