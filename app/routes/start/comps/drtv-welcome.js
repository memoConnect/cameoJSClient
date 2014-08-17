'use strict';

angular.module('cmRouteStart').directive('cmWelcome', [
    'cmUserModel',
    'cmUtil',
    'cmUserKeyStorageService',
    '$location',
    function(cmUserModel, cmUtil, cmUserKeyStorageService, $location){
        return {
            restrict: 'E',
            templateUrl: 'routes/start/comps/drtv-welcome.html',
            controller: function ($scope) {

                $scope.goToQuickStart = function(){
                    $location.path('/start/quickstart');
                };
            }
        }
    }
]);