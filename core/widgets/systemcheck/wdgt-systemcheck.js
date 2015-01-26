'use strict';

angular.module('cmWidgets').directive('cmWidgetSystemcheck',[
    'cmSystemCheck', 'cmVersion', 'cmDevice', 'cmConfig',
    '$filter',
    function(cmSystemCheck, cmVersion, cmDevice, cmConfig,
             $filter){

        return {
            restrict: 'E',
            templateUrl: 'widgets/systemcheck/wdgt-systemcheck.html',
            controller: function ($scope) {

                $scope.version = cmVersion.version;
                $scope.isApp = cmDevice.isApp();
                $scope.appLinks = $filter('appStoreLink')(cmConfig.static.appLinks);

                $scope.localStorage = cmSystemCheck.checkLocalStorage();

                cmSystemCheck.checkClientVersion(false).then(
                    function(){
                        $scope.isClientUpToDate = true;
                    },
                    function(){
                        $scope.isClientUpToDate = false;
                    }
                );
            }
        }
    }
]);