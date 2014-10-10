'use strict';

angular.module('cmWidgets').directive('cmWidgetSystemcheck', [
    'cmSystemCheck',
    'cmVersion',
    'cmDevice',
    function(cmSystemCheck, cmVersion, cmDevice){
        return {
            restrict: 'E',
            templateUrl: 'widgets/systemcheck/wdgt-systemcheck.html',
            controller: function ($scope, $element) {
                $scope.localStorage = cmSystemCheck.checkLocalStorage();
                cmSystemCheck.checkClientVersion(false).then(
                    function(){
                        $scope.clientVersionCheck = true;
                    },
                    function(){
                        $scope.clientVersionCheck = false
                    }
                );

                $scope.version = cmVersion.version;

                $scope.isApp = cmDevice.isApp();
                $scope.storeLink = '';
                $scope.icon = 'gfx/pixel.png';
                if($scope.isApp){
                    if(cmDevice.isAndroid()){
                        $scope.icon = 'gfx/stores/playStore_aktiv.png';
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