define([
    'app',
    'ngload!pckCore',
    'ngload!pckUi',
    'ngload!pckUser',
], function (app) {
    'use strict';

    app.register.controller('StartCtrl', [
        'cmUserModel', 'cmUtil', 'cmUserKeyStorageService',
        '$scope', '$location',
        function(cmUserModel, cmUtil, cmUserKeyStorageService, $scope, $location) {
            var storageKey = 'appSettings',
                storageService = new cmUserKeyStorageService(storageKey);

            $scope.showWelcome = false;
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
    ]);
});