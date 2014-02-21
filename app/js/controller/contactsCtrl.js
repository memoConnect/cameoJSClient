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
    '$routeParams',
    'ModelContacts',
    function($scope, $routeParams, ModelContacts){
        /**
         * get quantitiy for tab badges
         * @private
         */
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

        $scope.contactsQty = 0;

        $scope.navigation = [
            {i18n:'BACK',icon:'fa-chevron-left',href:'#/start'},
            {i18n:'ADD',icon:'fa-plus','default':true},
            {i18n:'ALL',icon:'fa-group',badge:'contactsQty'},
            {i18n:'REQUESTS',icon:'fa-link'}
        ];

        $scope.activeTab = $routeParams.tab ? $routeParams.tab.toUpperCase() : 'ADD';

        $scope.setActiveTab = function(tab){
            $scope.activeTab = tab;
        };

        // get quantity
        getQuantity();

    }]);

    return app;
});