'use strict';

angular.module('cmWidgets').directive('cmWidgetSystemcheck', [
    'cmSystemCheck',
    'cmVersion',
    'cmDevice',
    function(cmSystemCheck, cmVersion, cmDevice){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-systemcheck.html',
            controller: function ($scope) {
                $scope.localStorage = cmSystemCheck.checkLocalStorage();
                $scope.clientVersionCheck = cmSystemCheck.checkClientVersion();

                $scope.version = cmVersion.version;

                $scope.isApp = cmDevice.isApp();
                $scope.storeLink = '';
                $scope.icon = '';
                if($scope.isApp){
                    if(cmDevice.isAndroid()){
                        $scope.icon = 'playStore_aktiv.png';
                        $scope.storeLink = 'https://play.google.com/store/apps/details?id=de.cameonet';
                    } else if(cmDevice.isiOS()){
                        $scope.storeLink = '';
                    } else if(cmDevice.isWinPhone()){
                        // @todo storelink
                    } else if(cmDevice.isBlackBerry()){
                        // @todo storelink
                    }
                }
            }
        }
    }
]);