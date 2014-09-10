define([
    'app',
    'ngload!pckCore',
    'ngload!pckWidgets',
    'ngload!pckUser',
], function (app) {
    'use strict';

    app.register.controller('AuthenticationCtrl', [
        '$scope',
        '$routeParams',

        function($scope, $routeParams) {
            $scope.keyId        = $routeParams.keyId
            $scope.identityId   = $routeParams.identityId
        }
    ]);
});