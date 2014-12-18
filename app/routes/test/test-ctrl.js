'use strict';

angular.module('cmRoutes').controller('TestCtrl', [
    '$scope',
    function ($scope) {

        $scope.phoneNumberUndefined = undefined;
        $scope.phoneNumberEmpty = '';
        $scope.phoneNumberFull = '+4900000000';

    }
]);