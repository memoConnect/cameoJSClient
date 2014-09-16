'use strict';

angular.module('cmRoutes').controller('SettingsIdentityKeyCreateCtrl', [
    '$rootScope',
    '$scope',
    function($rootScope, $scope) {
        $scope.backBtn = true;
        if(typeof $rootScope.generateAutomatic != 'undefined'){
            $scope.backBtn = false;
        }
    }
]);