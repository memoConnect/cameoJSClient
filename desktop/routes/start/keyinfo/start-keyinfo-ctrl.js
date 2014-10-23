'use strict';

angular.module('cmRoutes').controller('StartKeyinfoCtrl', [
    'cmSettings',
    '$rootScope',
    function(cmSettings, $rootScope) {
        var skip = cmSettings.get('skipKeyInfo') || false;

        if(skip){
            $rootScope.goTo('/talks');
        }
    }
]);