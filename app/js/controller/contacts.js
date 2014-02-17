define([
    'app'
], function(app){
   'use strict';

    var mockResults = ['derMicha','dasEmpu','dutscher','reimerei','rhotp'];

    app.register.controller('ContactsCtrl',[
        '$scope',
        '$location',
        'cmContacts',
        'cmNotify',
        'cmLogger',
        function($scope, $location, cmContacts, cmNotify, cmLogger){
            $scope.navigation = [
                {id:'BACK',icon:'fa-chevron-left'},
                {id:'ADD'},
                {id:'CONTACTS'},
                {id:'REQUESTS'}
            ];
            $scope.activeTab = 'ADD';
            $scope.setActiveTab = function(tab){
                $scope.activeTab = tab;
            };
        }]);

    app.register.directive('cmSearchCameoId',
        function(cmContacts, cmLogger){
            return {
                restrict: 'A',
                scope: {},
                templateUrl: 'tpl/modules/contacts/cm-search-cameo-id.html',
                controller: function($scope, $element, $attrs){
                    $scope.results = [];

                    $scope.showResults = false;
                    $scope.showNoResults = false;

                    $scope.search = function(){
                        $scope.showResults = true;
                        $scope.results = mockResults;
                        // TODO: cmApi/cmContacts stuff
                    };

                    $scope.sendFriendshipRequest = function(cameoId){
                        cmLogger.debug('sendFriendshipRequest to '+cameoId);
                        // TODO: cmApi/cmContacts stuff
                    };
                }
            }
        });

    app.register.directive('cmContactsList',
        function(cmContacts, cmLogger){
            return {
                restrict: 'A',
                scope: {},
                templateUrl: 'tpl/modules/contacts/cm-contacts-list.html',
                controller: function($scope, $element, $attrs){
                    $scope.contacts = null;

                    $scope.getContacts = function(){
                        cmContacts.getAll().then(
                            function(data){
                                $scope.contacts = data;
                            }
                        );
                    };

                    $scope.editContact = function(){
                        cmLogger.debug('editContact '+cameoId);
                        // TODO: cmApi stuff
                    };

                    $scope.deleteContact = function(cameoId){
                        cmLogger.debug('deleteContact '+cameoId);
                        // TODO: cmApi stuff
                    };
                }
            }
        });

    app.register.directive('cmContactRequestList',
        function(cmContacts, cmLogger){
            return {
                restrict: 'A',
                scope: {},
                templateUrl: 'tpl/modules/contacts/cm-request-list.html',
                controller: function($scope, $element, $attrs){
                    $scope.results = mockResults;

                    $scope.acceptRequest = function(cameoId){
                        cmLogger.debug('acceptRequest' + cameoId);
                        // TODO: cmApi/cmContacts stuff
                    };

                    $scope.rejectRequest = function(cameoId){
                        cmLogger.debug('rejectRequest' + cameoId);
                        // TODO: cmApi/cmContacts stuff
                    }
                }
            }
        });
});