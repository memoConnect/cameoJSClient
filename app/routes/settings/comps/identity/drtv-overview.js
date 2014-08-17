'use strict';

angular.module('cmRouteSettings').directive('cmIdentitiesOverview', [
    'cmUserModel',
    '$rootScope',
    function(cmUserModel, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/identity/drtv-overview.html',
            controller: function ($scope) {
                $scope.ownIdentities = cmUserModel.data.identities;

                $scope.createNewIdentity = function(){
                    $rootScope.goto('/settings/identity/new');
                };

                $scope.switchToIdentity = function(identity){
                    cmUserModel.switchToIdentity(identity);
                };

                $scope.bam = function(identity){
                    if(identity.isActive == true){
                        $rootScope.goto('/settings/identity');
                    } else {
                        $scope.switchToIdentity(identity);
                    }
                };
            }
        }
    }
]);