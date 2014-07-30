'use strict';

angular.module('cmRouteSettings').directive('cmIdentityFirstKey', [
    'cmUserModel', 'cmCrypt', 'cmUtil', 'cmLogger', 'cmNotify', 'cmKey',
    '$window','cmAuth',
    function(cmUserModel, cmCrypt, cmUtil, cmLogger, cmNotify, cmKey,
             $window,cmAuth){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-identity-first-key.html',
            controller: function ($scope) {
                $scope.startBroadcast = function(){
                    cmAuth.sendBroadcast({name:'broadcast:started',data:{msg:$scope.message}})
                }
            }
        }
    }
]);