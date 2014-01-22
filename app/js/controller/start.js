'use strict';
define(['bootstrap/app', 'angular-cookies'], function (app) {
    app.register.controller('StartCtrl', ['$scope', '$cookieStore', '$location',
    function($scope, $cookieStore, $location) {
        $scope.logout = function(){
            $cookieStore.remove("token");
            $location.path("/login");
        };
    }]);
});