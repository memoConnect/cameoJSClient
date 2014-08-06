define([
    'app',
    'ngload!pckCore',
    'ngload!pckUi',
    'ngload!pckUser',
    'ngload!pckValidate',
    'ngload!pckRouteSettings'
], function (app) {
    'use strict';

    app.register.controller('StartCtrl', [
        'cmUserModel', 'cmUtil', 'cmUserKeyStorageService',
        '$scope', '$location',
        function(cmUserModel, cmUtil, cmUserKeyStorageService, $scope, $location) {
            var storageKey = 'appSettings',
                storageService = new cmUserKeyStorageService(storageKey);

            $scope.showWelcome = false;
            $scope.skipStart = storageService.get('skipStart') || false;

            /**
             * Welcome message for new user
             */
            if(cmUserModel.comesFromRegistration !== false){
                cmUserModel.comesFromRegistration = false;

                $scope.showWelcome = true;
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