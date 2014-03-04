define([
    'app',
    'ngload!pckUser'
], function (app) {
    'use strict';

    app.register.controller('StartCtrl', [
    '$scope',
    '$cookieStore',
    'cmUserModel',
    function($scope, $cookieStore, cmUserModel) {
        $scope.identity = cmUserModel.data;

        $scope.logout = function(){
            cmUserModel.doLogout();
        };
    }]);
});