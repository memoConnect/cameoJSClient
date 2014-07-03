'use strict';

angular.module('cmUi').directive('cmIdentity',[
    'cmUserModel',
    function (cmUserModel){
        return {
            restrict: 'AE',
            template: '<a href="#/settings/identity">' +
                        '<cm-avatar cm-data="identity"></cm-avatar>' +
                        '<span>{{identity.getDisplayName()}}</span>' +
                      '</a>',
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