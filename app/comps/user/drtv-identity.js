'use strict';

angular.module('cmUser').directive('cmIdentity',[
    'cmUserModel', 'cmModal',
    '$location',
    function (cmUserModel, cmModal, $location){
        return {
            restrict: 'AE',
            templateUrl: 'comps/user/drtv-identity.html',
            scope: true,
            controller: function($scope){
                $scope.randModalId = Math.floor((Math.random()*6)+1);

                function setIdentity(){
                    $scope.identity = cmUserModel.data.identity;
                }

                setIdentity();

                cmUserModel.on('update:finished',function(){
                    setIdentity();
                });

                $scope.showIdentityModal = function(){
                    var modalId = 'modal-identity-' + $scope.randModalId;
                    cmModal.create({
                        id: modalId,
                        type: 'plain',
                        'class': 'no-padding',
                        'cm-title': 'IDENTITY.MODAL.HEADER'
                    },'<cm-identity-modal></cm-identity-modal>');
                    cmModal.open(modalId);
                };
            }
        }
    }
]);