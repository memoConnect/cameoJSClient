define([
    'app',
    'ngload!pckCore',
    // 'ngload!pckUi',
    // 'ngload!pckUser',
    // 'ngload!pckValidate',
    // 'ngload!pckRouteSettings'
], function (app) {
    'use strict';

    app.register.controller('AuthenticationCtrl', [
        'cmUtil',
        '$scope', '$rootScope', '$routeParams',
        function(cmUtil, $scope, $rootScope, $routeParams, $location) {
           $scope.key = $routeParams.keyId
        }
    ]);
});