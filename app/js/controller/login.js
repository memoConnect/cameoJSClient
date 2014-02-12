define([

    'app',
    'util-base64'

], function (app) {
    'use strict';

    app.register.controller('LoginCtrl', [
        '$scope',
        '$cookieStore',
        '$location',
        'AuthService',
        'cm',
        'cmCrypt',
        function ($scope, $cookieStore, $location, AuthService, cm, cmCrypt) {
            $scope.placeholder = {
                user: "Username"
               ,pass: "Passwort"
            };
            $scope.formData = {};
            $scope.formRes = {};

            $scope.token = $cookieStore.get("token")+" go to start"||"none";

            $scope.autologin = function(){
                cm.log.debug("autologin called");
                $scope.formData = {
                    user: "Max"
                   ,pass: "max.mustermann"
                };
            };

            $scope.getToken = function(){
                cm.log.debug("getToken called");
                AuthService.getToken(Base64.encode($scope.formData.user + ":" + cmCrypt.hash($scope.formData.pass))).
                    success(function(res){
                        $scope.formRes = res.data;
                        $cookieStore.put("token",res.data.token);
                        $scope.token = res.data.token;
                        $location.path("/start");
                    }).
                    error(function(res){
                        $scope.formRes = res;
                    })
            };

        }]
    );
});