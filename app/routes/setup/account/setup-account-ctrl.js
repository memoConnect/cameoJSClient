'use strict';

angular.module('cmRoutes').controller('SetupAccountCtrl', [
    'cmHistory', '$rootScope',
    function(cmHistory, $rootScope) {
        /**
         * @todo
         */
        if(cmHistory.getPrev() != '/registration' || cmHistory.getPrev() != '/setup/account'){
            //$rootScope.goTo('/settings/account', true);
        }
    }
]);