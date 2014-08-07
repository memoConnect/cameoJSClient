'use strict';

angular.module('cmUser').directive('cmIdentityModal',[
    'cmUserModel', 'cmModal',
    '$location',
    function (cmUserModel, cmModal,
              $location){
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
                        cmModal.close('modal-identity-' + $scope.randModalId);
                    }
                    $location.path('/settings/identity');
                };
            }
        }
    }
]);