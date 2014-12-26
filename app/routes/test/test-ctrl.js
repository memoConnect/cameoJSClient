'use strict';

angular.module('cmRoutes').controller('TestCtrl', [
    '$scope',
    function ($scope) {

        $scope.phoneNumberUndefined = undefined;
        $scope.phoneNumberUndefinedOut = undefined;
        $scope.phoneNumberEmpty = '';
        $scope.phoneNumberEmptyOut = '';
        $scope.phoneNumberFull = '+4900000000';
        $scope.phoneNumberFullOut = '+4900000000';

    }
]);