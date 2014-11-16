'use strict';

angular.module('cmWidgets').directive('cmWidgetDownload',
    function(cmConfig, cmDevice,
             $filter){
        return {
            restrict: 'E',
            templateUrl: 'widgets/start/wdgt-download.html',
            controller: function ($scope) {
                $scope.appLinks = $filter('appStoreLink')(cmConfig.appLinks);

                $scope.goToWelcome = function(){
                    $scope.goTo('/start/welcome');
                };

                // isDesktop or App or none apps are available for device
                if(cmDevice.isDesktop('cmWidgetDownload') || cmDevice.isApp() || $scope.appLinks.length == 0){
                    $scope.goToWelcome();
                }
            }
        }
    }
);