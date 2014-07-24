'use strict';

angular.module('cmUi').directive('cmIdentityModal',[
    'cmUserModel',
    'cmModal',
    '$location',
    function (cmUserModel, cmModal, $location){
        return {
            restrict: 'AE',
            templateUrl: 'comps/ui/drtv-identity-modal.html',
            scope: true,
            controller: function($scope){
                $scope.goToIdentitySettings = function(){
                    if($location.$$url == '/settings/identity'){
                        cmModal.close('modal-identity-' + $scope.randModalId);
                    }
                    $location.path('/settings/identity');
                };
            }
        }
    }
]);