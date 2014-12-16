'use strict';

angular.module('cmRoutes').controller('SetupIdentityCtrl', [
    'cmHistory', '$rootScope',
    function(cmHistory, $rootScope) {
        /**
         * @todo
         */
        if(!cmHistory.comesFrom('/setup/account')){
            //$rootScope.goTo('/settings/identity/edit', true);
        }
    }
]);