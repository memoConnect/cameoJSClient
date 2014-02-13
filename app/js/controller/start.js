define([

    'app'

], function (app) {
    'use strict';

    app.register.controller('StartCtrl', [
        '$scope',
        '$cookieStore',
        '$location',
        function($scope, $cookieStore, $location) {
            $scope.logout = function(){
                $cookieStore.remove("token");
                $location.path("/login");
            };
        }]
    );
});