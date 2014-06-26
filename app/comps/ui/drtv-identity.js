'use strict';

angular.module('cmUi').directive('cmIdentity',[
    'cmUserModel',
    function (cmUserModel){
        return {
            restrict: 'AE',
            template: '<cm-avatar cm-data="identity"></cm-avatar> <a href="#/settings/identity" style="color:#fff">{{identity.getDisplayName()}}</a>',
            scope: true,
            controller: function($scope){
                function setIdentity(){
                    $scope.identity = cmUserModel.data.identity;
                }

                setIdentity();

                cmUserModel.on('update:finished',function(){
                    setIdentity();
                });
            }
        }
    }
]);