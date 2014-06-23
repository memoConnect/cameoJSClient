'use strict';

angular.module('cmRouteSettings').directive('cmIdentitySettings', [
    'cmUserModel',
    '$location',
    function(cmUserModel, $location){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-identity-settings.html',
            controller: function ($scope) {
                $scope.identity = cmUserModel.data.identity;

                console.log($scope.identity)

                //////////////////////
                // TODO: mock workarround json in array
                $scope.identity.phoneNumbers = [
                    $scope.identity.phoneNumber || {value:''}
                ];
                $scope.identity.emails = [
                    $scope.identity.email || {value:''}
                ];
                //////////////////////
//                console.log($scope.identity)

                $scope.goToKeys = function(){
                    $location.path('/settings/identity/keys');
                }
            }
        }
    }
]);