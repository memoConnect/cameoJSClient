'use strict';

angular.module('cmRouteStart').directive('cmKeyInfo', [
    'cmUserModel',
    'cmUtil',
    'cmUserKeyStorageService',
    '$location',
    '$rootScope',
    function(cmUserModel, cmUtil, cmUserKeyStorageService, $location, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'routes/start/comps/drtv-key-info.html',
            controller: function ($scope) {

                if(cmUserModel.hasPrivateKey()){
                    $location.path('/settings/identity/keys');
                    return false;
                }

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
                    $scope.goto('/talks');
                };

                $scope.showKeySize = false;
                $scope.toggleKeySize = function(){
                    //console.log('toggleKeySize', $scope.showKeySize)
                    if(!$scope.showKeySize){
                        $scope.showKeySize = true;
                    } else {
                        $scope.showKeySize = false;
                    }
                };

                $scope.keySize = 2048;
                $scope.chooseKeySize = function(size){
                    if(size == '4096'){
                        $scope.keySize = 4096;
                    } else {
                        $scope.keySize = 2048;
                    }
                };

                $scope.generateKey = function(){
                    $rootScope.generateAutomatic = {
                        generate:true,
                        keySize: $scope.keySize
                    };

                    $scope.goto('/settings/identity/keys/create');
                }
            }
        }
    }
]);