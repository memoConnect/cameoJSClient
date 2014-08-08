'use strict';

angular.module('cmUser').directive('cmIdentityModal',[
    'cmUserModel', 'cmModal',
    '$location', '$rootScope',
    function (cmUserModel, cmModal,
              $location, $rootScope){
        return {
            restrict: 'AE',
            templateUrl: 'comps/user/drtv-identity-modal.html',
            scope: true,
            controller: function($scope){
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

                $rootScope.$on('identity:switched', function(){
                    cmModal.close($scope.modalId);
                });
            }
        }
    }
]);