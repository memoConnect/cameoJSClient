'use strict';

angular.module('cmRouteSettings').directive('cmIdentityFirstKey', [
    'cmUserModel', 'cmCrypt', 'cmUtil', 'cmLogger', 'cmNotify', 'cmKey',
    '$window',
    function(cmUserModel, cmCrypt, cmUtil, cmLogger, cmNotify, cmKey,
             $window,cmAuth){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/identity/drtv-first-key.html',
            controller: function ($scope) {
            }
        }
    }
]);