define([
    'app',
    'mUser'
], function (app) {
    'use strict';

    app.register.controller('StartCtrl', [
        '$scope',
        '$cookieStore',
        '$location',
        'ModelUser',
        function($scope, $cookieStore, $location, ModelUser) {
            $scope.identity = {cameoId:'is loading...'};

            $scope.logout = function(){
                ModelUser.doLogout();
                $location.path("/login");
            };
        }]
    );
});