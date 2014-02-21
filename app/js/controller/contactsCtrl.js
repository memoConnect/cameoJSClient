define([
    'app',
    'mContacts',
    '_d/searchCameoIdDirv',
    '_d/addExternContactDirv',
    '_d/contactsListDirv',
    '_d/contactRequestListDirv'
], function(app){
    'use strict';

    app.register.controller('ContactsCtrl',[
    '$scope',
    'ModelContacts',
    function($scope, ModelContacts){

        $scope.contactsQty = 0;
        $scope.navigation = [
            {id:'BACK',icon:'fa-chevron-left',href:'#/start'},
            {id:'ADD',icon:'fa-plus'},
            {id:'CONTACTS',icon:'fa-group',badge:$scope.contactsQty},
            {id:'REQUESTS',icon:'fa-link'}
        ];
        $scope.activeTab = 'ADD';
        $scope.setActiveTab = function(tab){
            $scope.activeTab = tab;
        };

        function getQuantity(){
            ModelContacts.getQuantity().then(
                function(qty){
                    $scope.contactsQty = qty;
                },
                function(){
                    $scope.contactsQty = 0;
                }
            )
        }

        getQuantity();

    }]);

    return app;
});