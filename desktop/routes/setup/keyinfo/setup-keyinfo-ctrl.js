'use strict';

angular.module('cmRoutes').controller('SetupKeyinfoCtrl', [
    'cmSettings',
    '$rootScope',
    function(cmSettings, $rootScope) {
        var skip = cmSettings.get('skipKeyInfo') || false;

        if(skip){
            $rootScope.goTo('/talks');
        }
    }
]);