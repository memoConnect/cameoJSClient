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
        'cmUserModel', 'cmUtil', 'cmUserKeyStorage',
        '$scope', '$location',
        function(cmUserModel, cmUtil, cmUserKeyStorage, $scope, $location) {
            var storageKey = "userSettings",
                storageService = new cmUserKeyStorage(storageKey);


            $scope.showWelcome = false;
            $scope.skipStart = false;

            /**
             * Welcome modal shown for new user
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
                    $scope.skipStart= false;
                }
            };

            $scope.goToTalks = function(){
                $location.path('/talks');
            };
        }
    ]);
});