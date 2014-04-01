define([
    'app',
    'cmUserModel',
    'ngload!pckUser',
    'ngload!cmUtil',
    'ngload!cmCrypt'
], function (app) {
    'use strict';

    app.register.controller('SettingsCtrl', [
        '$scope',
        '$rootScope',
        'cmUserModel',
        'cmLogger',
        'cmUtil',
    function($scope, $rootScope, cmUserModel) {
        $scope.identity = cmUserModel.data;

        /**
         * Spinner Tests
         */
        $scope.showSpinner = function(){
            $rootScope.$broadcast('SHOW-SPINNER');
        };

        $scope.hideSpinner = function(){
            $rootScope.$broadcast('HIDE-SPINNER');
        };
    }]);
});