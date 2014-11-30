'use strict';

angular.module('cmRoutes').controller('AuthenticationCtrl', [
    '$scope',
    '$routeParams',
    function($scope, $routeParams) {
        $scope.keyId        = $routeParams.keyId
        $scope.identityId   = $routeParams.identityId
    }
]);