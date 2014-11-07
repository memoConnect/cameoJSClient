'use strict';

angular.module('cmWidgets').directive('cmWidgetDownload',
    function(cmEnv, cmDevice,
             $filter){
        return {
            restrict: 'E',
            templateUrl: 'widgets/start/wdgt-download.html',
            controller: function ($scope) {
                $scope.appLinks = $filter('appStoreLink')(cmEnv.appLinks);

                $scope.goToWelcome = function(){
                    $scope.goTo('/start/welcome');
                };

                // isDesktop or App or none apps are available for device
                if(cmDevice.isDesktop() || cmDevice.isApp() || $scope.appLinks.length == 0){
                    $scope.goToWelcome();
                }
            }
        }
    }
);