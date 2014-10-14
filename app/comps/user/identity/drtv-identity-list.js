'use strict';

angular.module('cmUser').directive('cmIdentityList', [
    'cmUserModel',
    '$rootScope',
    function(cmUserModel, $rootScope){
        return {
            restrict: 'E',
            scope: {
                identities: "=cmIdentities"
            },
            templateUrl: 'comps/user/identity/drtv-identity-list.html',
            controller: function ($scope) {
                $scope.switchToIdentity = function(identity){
                    cmUserModel.switchToIdentity(identity);
                };

                $scope.bam = function(identity){
                    if(identity.isActive == true){
                        $rootScope.goTo('/settings/identity/edit');
                    } else {
                        $scope.switchToIdentity(identity);
                    }
                };
            }
        }
    }
]);