define([
    'app'
], function (app) {
    'use strict';

    app.register.controller('StartCtrl', [
        '$scope',
        '$cookieStore',
        '$location',
        'cmAuth',
        function($scope, $cookieStore, $location, cmAuth) {
            $scope.identity = {cameoId:'is loading...'};

            cmAuth.getIdentity().
            then(
                function(data){
                    $scope.identity = data;
                }
            );

            $scope.logout = function(){
                $cookieStore.remove("token");
                $location.path("/login");
            };
        }]
    );
});