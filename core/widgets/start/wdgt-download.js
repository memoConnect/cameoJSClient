'use strict';

angular.module('cmWidgets').directive('cmWidgetDownload',
    function(cmConfig, cmDevice, cmUserModel,
             $filter){
        return {
            restrict: 'E',
            templateUrl: 'widgets/start/wdgt-download.html',
            controller: function ($scope) {
                $scope.appLinks = $filter('appStoreLink')(cmConfig.static.appLinks);

                $scope.goToWelcome = function(){
                    $scope.goTo('/start/welcome');
                };

                $scope.goToSetup = function(){
                    $scope.goTo('/setup/account');
                };


                // isDesktop or App or none apps are available for device
                if(cmDevice.isDesktop('cmWidgetDownload') || cmDevice.isApp() || $scope.appLinks.length == 0){
                    //$scope.goToWelcome();
                }

                function callbackAccountUpdate(){
                    if(typeof cmUserModel.data.account.registrationIncomplete != 'undefined' && cmUserModel.data.account.registrationIncomplete == false){
                        $rootScope.goTo('/settings/identity/key/create');
                    }
                }

                cmUserModel.on('account:update', callbackAccountUpdate);

                $scope.$on('$destroy', function(){
                    cmUserModel.off('account:update', callbackAccountUpdate);
                });
            }
        }
    }
);