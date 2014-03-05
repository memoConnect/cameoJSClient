define([
    'app',
    'ngload!pckUser'
], function (app) {
    'use strict';

    app.register.controller('StartCtrl', [
    '$scope',
    'cmUserModel',
    function($scope, cmUserModel) {
        $scope.identity = cmUserModel.data;

        $scope.logout = function(){
            cmUserModel.doLogout();
        };
    }]);
});