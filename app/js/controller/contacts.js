define([
    'app'
], function(app){
   'use strict';

    var mockResults = ['derMicha','dasEmpu','dutscher','reimerei','rhotp'];

    app.register.controller('ContactsCtrl',[
        '$scope',
        '$location',
        'cmNotify',
        'cmLogger',
        function($scope, $location, cmNotify, cmLogger){

        }]);

    app.register.directive('cmSearchCameoId',
        function(cmApi, cmLogger){
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
                        // TODO: cmApi stuff
                    };

                    $scope.sendFriendshipRequest = function(cameoId){
                        cmLogger.debug('sendFriendshipRequest to '+cameoId);
                        // TODO: cmApi stuff
                    };
                }
            }
        });

    app.register.directive('cmContactsList',
        function(cmApi, cmLogger, cmAuth){
            return {
                restrict: 'A',
                scope: {},
                templateUrl: 'tpl/modules/contacts/cm-contacts-list.html',
                controller: function($scope, $element, $attrs){
                    $scope.contacts = [];

                    $scope.getContacts = function(){
                        cmApi.get({
                            url: '/contacts?token='+cmAuth.getToken()
                        }).then(
                            function(data){
                                $scope.contacts = data;
                            },
                            function(){
                                $scope.contacts = [];
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
        function(cmApi, cmLogger){
            return {
                restrict: 'A',
                scope: {},
                templateUrl: 'tpl/modules/contacts/cm-request-list.html',
                controller: function($scope, $element, $attrs){
                    $scope.results = mockResults;

                    $scope.acceptRequest = function(cameoId){
                        cmLogger.debug('acceptRequest' + cameoId);
                        // TODO: cmApi stuff
                    };

                    $scope.rejectRequest = function(cameoId){
                        cmLogger.debug('rejectRequest' + cameoId);
                        // TODO: cmApi stuff
                    }
                }
            }
        });
});