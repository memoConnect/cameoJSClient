'use strict';

angular.module('cmRoutes')
    .controller('PasswordResetCtrl',[
        '$scope', '$routeParams',
        function($scope, $routeParams){
            $scope.resetId = $routeParams.resetId || '';
        }
    ]);