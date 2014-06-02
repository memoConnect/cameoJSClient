'use strict';

angular.module('cmUi').directive('cmIdentity',[
    'cmUserModel',
    function (cmUserModel){
        return {
            restrict: 'AE',
            template: '<cm-avatar cm-data="identity" cm-header="true"></cm-avatar> {{identity.getDisplayName()}}',
            scope: true,
            controller: function($scope){
                $scope.identity = cmUserModel.data.identity;

                cmUserModel.on('init:finish',function(){
                    $scope.identity = cmUserModel.data.identity;
                });
            }
        }
    }
]);