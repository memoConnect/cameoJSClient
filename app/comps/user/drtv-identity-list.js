'use strict';

angular.module('cmUser').directive('cmIdentityList', [
    'cmUserModel',
    '$rootScope',
    function(cmUserModel, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/drtv-identity-list.html',
            controller: function ($scope) {
                //console.log('cmIdentitiesOverview');
                $scope.ownIdentities = cmUserModel.data.identities;

                $scope.createNewIdentity = function(){
                    $rootScope.goto('/settings/identity/new');
                };

                $scope.switchToIdentity = function(identity){
                    cmUserModel.switchToIdentity(identity);
                };

                $scope.bam = function(identity){
                    if(identity.isActive == true){
                        $rootScope.goto('/settings/identity/edit');
                    } else {
                        $scope.switchToIdentity(identity);
                    }
                };
            }
        }
    }
]);