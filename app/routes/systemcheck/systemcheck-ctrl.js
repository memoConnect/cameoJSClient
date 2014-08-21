define([
    'app',
    'ngload!pckCore',
    'ngload!pckUi'
], function (app) {
    'use strict';

    app.register.controller('SystemcheckCtrl', [
        'cmSystemCheck',
        '$scope',
        function(cmSystemCheck, $scope) {
            $scope.localStorage = cmSystemCheck.checkLocalStorage();
        }
    ]);
});