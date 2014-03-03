define([
    'app',
    'mUser'
], function (app) {
    'use strict';

    app.register.controller('StartCtrl', [
    '$scope',
    '$cookieStore',
    'ModelUser',
    function($scope, $cookieStore, ModelUser) {
        $scope.identity = ModelUser.data;

        $scope.logout = function(){
            ModelUser.doLogout();
        };
    }]);
});