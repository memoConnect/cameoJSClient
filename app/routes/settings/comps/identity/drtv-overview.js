'use strict';

angular.module('cmRouteSettings').directive('cmIdentitíesOverview', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/identity/drtv-overview.html',
            controller: function ($scope) {
                $scope.ownIdentities = cmUserModel.data.identities;

                $scope.createNewIdentity = function(){
                    $location.path('/settings/identity/new');
                };

                $scope.goToSettings = function(){
                    if($location.$$url == '/settings/identity'){
                        cmModal.close($scope.modalId);
                    }
                    $location.path('/settings/identity');
                };

                $scope.switchToIdentity = function(identity){
                    cmUserModel.switchToIdentity(identity);
                };

                $scope.bam = function(identity){
                    if(identity.isActive == true){
                        $scope.goToSettings();
                    } else {
                        $scope.switchToIdentity(identity);
                    }
                };
            }
        }
    }
]);