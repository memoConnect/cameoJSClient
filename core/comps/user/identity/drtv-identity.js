'use strict';

angular.module('cmUser').directive('cmIdentity',[
    'cmUserModel', 'cmModal',
    '$rootScope', '$timeout',
    function (cmUserModel, cmModal,
              $rootScope, $timeout){
        return {
            restrict: 'AE',
            templateUrl: 'comps/user/identity/drtv-identity.html',
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

                $scope.goToIdentity = function(){
                    $rootScope.goto('/settings/identity/list');
                };
            }
        }
    }
]);