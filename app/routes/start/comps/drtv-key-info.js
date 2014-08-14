'use strict';

angular.module('cmRouteStart').directive('cmKeyInfo', [
    'cmUserModel',
    'cmUtil',
    'cmUserKeyStorageService',
    '$location',
    function(cmUserModel, cmUtil, cmUserKeyStorageService, $location){
        return {
            restrict: 'E',
            templateUrl: 'routes/start/comps/drtv-key-info.html',
            controller: function ($scope) {

                var storageKey = 'appSettings',
                    storageService = new cmUserKeyStorageService(storageKey);

                $scope.showWelcome = true;
                $scope.showKeyInfo = true;
                $scope.skipStart = storageService.get('skipStart') || false;

                /**
                 * Welcome message for new user
                 */
                if(cmUserModel.comesFromRegistration !== false){
                    cmUserModel.comesFromRegistration = false;

                    $scope.showWelcome = true;
                }

                if(cmUserModel.loadLocalKeys().length > 0){
                    $scope.showKeyInfo = false;
                }

                $scope.setSkipStart = function(){
                    if(!$scope.skipStart){
                        storageService.set('skipStart', true);
                        $scope.skipStart = true;
                    } else {
                        storageService.set('skipStart', false);
                        $scope.skipStart = false;
                    }
                };

                $scope.goToTalks = function(){
                    $location.path('/talks');
                };
            }
        }
    }
]);