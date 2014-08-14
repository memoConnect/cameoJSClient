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

                $scope.skipKeyInfo = false;
                $scope.skipKeyInfo = storageService.get('skipKeyInfo') || false;

                if(cmUserModel.loadLocalKeys().length > 0){
                    $scope.skipKeyInfo = true;
                }

                $scope.toggleSkipKeyInfo = function(){
                    if(!$scope.skipKeyInfo){
                        storageService.set('skipKeyInfo', true);
                        $scope.skipKeyInfo = true;
                    } else {
                        storageService.set('skipKeyInfo', false);
                        $scope.skipKeyInfo = false;
                    }
                };

                $scope.goToTalks = function(){
                    $location.path('/talks');
                };

                $scope.generateKey = function(){
                    $location.path('settings/identity/keys/create');
                };
            }
        }
    }
]);