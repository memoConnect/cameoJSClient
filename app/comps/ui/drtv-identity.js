'use strict';

angular.module('cmUi').directive('cmIdentity',[
    'cmUserModel',
    'cmModal',
    '$location',
    function (cmUserModel, cmModal, $location){
        return {
            restrict: 'AE',
            templateUrl: 'comps/ui/drtv-identity.html',
            scope: true,
            controller: function($scope){
                function setIdentity(){
                    $scope.identity = cmUserModel.data.identity;
                }

                setIdentity();

                cmUserModel.on('update:finished',function(){
                    setIdentity();
                });

                $scope.goToIdentitySettings = function(){
                    if($location.$$url == '/settings/identity'){
                        cmModal.close('modal-identity');
                    }
                    $location.path('/settings/identity');
                }
            }
        }
    }
]);