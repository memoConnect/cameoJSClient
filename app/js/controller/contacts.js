define([
    'app',
    'mContacts',
    '_d/addExternContactDirv'
], function(app){
    'use strict';

    app.register.controller('ContactsCtrl',[
        '$scope',
        'ModelContacts',
        function($scope, ModelContacts){
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


            $scope.contactsQty = 0;
            $scope.getContactsQty = function(){
                ModelContacts.getQuantity().then(
                    function(qty){
                        $scope.contactsQty = qty;
                    },
                    function(){
                        $scope.contactsQty = 0;
                    }
                )
            };

        }]);

    app.register.directive('cmSearchCameoId',
        function(ModelContacts, cmLogger){
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

                        ModelContacts.
                        searchCameoId($scope.string).
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
                            ModelContacts.
                            sendFriendRequest(id).
                            then(
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
        function(ModelContacts, cmLogger){
            return {
                restrict: 'A',
                scope: {},
                templateUrl: 'tpl/modules/contacts/cm-contacts-list.html',
                controller: function($scope, $element, $attrs){
                    $scope.contacts = null;
                    $scope.contactsQty = 0;

                    /**
                     * Get Contact List
                     */
                    $scope.getContacts = function(){
                        ModelContacts.getAll(10,0).then(
                            function(data){
                                $scope.contacts = data;
                            },
                            function(){
                                $scope.contacts = null;
                            }
                        );
                    };

                    $scope.getContactsQty = function(){
                        ModelContacts.getQuantity().then(
                            function(qty){
                                $scope.contactsQty = qty;
                            },
                            function(){
                                $scope.contactsQty = 0;
                            }
                        )
                    }

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
        function(ModelContacts, cmLogger){
            return {
                restrict: 'A',
                scope: {},
                templateUrl: 'tpl/modules/contacts/cm-request-list.html',
                controller: function($scope, $element, $attrs){
                    $scope.results = [];

                    $scope.loadFriendRequests = function(){
                        ModelContacts.getFriendRequests().then(
                            function(data){
                                $scope.results = data;
                            }
                        )
                    }

                    $scope.acceptRequest = function(id){
                        cmLogger.debug('acceptRequest ' + id);
                        // TODO: notify, update ContactList
                        ModelContacts.answerFriendRequest(id, 'accept').then(
                            function(){
                                rmFromModel(id);
                            }
                        );
                    };

                    $scope.rejectRequest = function(id){
                        cmLogger.debug('rejectRequest ' + id);
                        // TODO: notify, update ContactList
                        ModelContacts.answerFriendRequest(id, 'reject').then(
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