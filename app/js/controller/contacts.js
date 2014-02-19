define([
    'app'
//    'mContacts'
], function(app){
    'use strict';

    var mockResults = ['derMicha','dasEmpu','dutscher','reimerei','rhotp'];
    var mockRequestResults = [{cameoId:'derMicha',requestId:'qwertz1'},{cameoId:'dasEmpu',requestId:'qwerrtz2'},{cameoId:'dutscher',requestId:'qwerrtz3'},{cameoId:'reimerei',requestId:'qwerrtz4'},{cameoId:'rhotp',requestId:'qwerrtz5'}];
    var mockSearchResults = [{"id":"vCXqmtXycssTuENaa3rh","cameoId":"oOqn9Nj3lDQeMGLFdHM5","displayName":"NoName"}];

    app.register.controller('ContactsCtrl',[
        '$scope',
        function($scope){
            $scope.navigation = [
                {id:'BACK',icon:'fa-chevron-left',href:'#/start'},
                {id:'ADD',icon:'fa-plus'},
                {id:'CONTACTS',icon:'fa-group'},
                {id:'REQUESTS',icon:'fa-link'}
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

                    $scope.search = function(){
                        if($scope.searchCameoId.string.$invalid){
                            $scope.results = [];
                            return false;
                        }

                        cmContacts.searchCameoId($scope.string).
                        then(
                            function(data){
                                $scope.results = data;
                            },
                            function(){

                            }
                        );
                        return true;
                    };

                    $scope.sendFriendRequest = function(id){
                        // TODO: Notification
                        if(angular.isDefined(id)){
                            cmContacts.sendFriendRequest(id).then(
                                function(){
                                    cmLogger.debug("FriendRequest success");
                                },
                                function(){
                                    cmLogger.debug("FriendRequest error");
                                }
                            )
                        }
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

                    /**
                     * Get Contact List
                     */
                    $scope.getContacts = function(){
                        cmContacts.getAll(10,0).then(
                            function(data){
                                $scope.contacts = data;
                            },
                            function(){
                                $scope.contacts = null;
                            }
                        );
=======
                    $scope.contacts = [];

                    $scope.getContacts = function(){
                        $scope.contacts = cmApi.post({
                            url: '/contacts'
                        });
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
        function(cmLogger, cmContacts){
            return {
                restrict: 'A',
                scope: {},
                templateUrl: 'tpl/modules/contacts/cm-request-list.html',
                controller: function($scope, $element, $attrs){
                    $scope.results = [];

                    $scope.loadFriendRequests = function(){
                        cmContacts.getFriendRequests().then(
                            function(data){
                                $scope.results = data;
                            }
                        )
                    }

                    $scope.acceptRequest = function(id){
                        cmLogger.debug('acceptRequest ' + id);
                        // TODO: notify
                        cmContacts.answerFriendRequest(id, 'accept').then(
                            function(){
                                rmFromModel(id);
                            }
                        );
                    };

                    $scope.rejectRequest = function(id){
                        cmLogger.debug('rejectRequest ' + id);
                        // TODO: notify
                        cmContacts.answerFriendRequest(id, 'reject').then(
                            function(){
                                rmFromModel(id);
                            }
                        );
                    }

                    function rmFromModel(id){
                        if(angular.isDefined(id)){
                            angular.forEach($scope.results,function(value, key){
                               if(value.id == id){
                                   $scope.results.splice(key, 1);
                               }
                            });
                        }
                    }
                }
            }
        });

    return app;
});