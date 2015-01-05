'use strict';

angular.module('cmRoutes').controller('SetupAccountCtrl', [
    'cmHistory', '$rootScope',
    function(cmHistory, $rootScope) {
        if(!cmHistory.comesFrom('/registration')){
            //$rootScope.goTo('/settings/account', true);
        }
    }
]);