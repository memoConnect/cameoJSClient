'use strict';

angular.module('cmWidgets').directive('cmWidgetSystemcheck',
    function(cmSystemCheck, cmVersion, cmDevice, cmEnv){
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
                        $scope.storeLink = cmEnv.appLinks.android.href;
                        $scope.icon = cmEnv.appLinks.android.icon;
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
);