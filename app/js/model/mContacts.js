define([
    'app',
    'cmContacts',
    'cmLogger',
    'mUser'
], function () {
    'use strict';

    var mContacts = angular.module('mContacts',[]);

    mContacts.service('ModelContacts',function(ModelUser, cmContacts, cmLogger, $q, $rootScope){
        var self = this;
        var mockContacts = ['derMicha','dasEmpu'];
        var mockResults = ['derMicha','dasEmpu','dutscher','reimerei','rhotp'];
        var mockRequestResults = [{cameoId:'derMicha',requestId:'qwertz1'},{cameoId:'dasEmpu',requestId:'qwerrtz2'},{cameoId:'dutscher',requestId:'qwerrtz3'},{cameoId:'reimerei',requestId:'qwerrtz4'},{cameoId:'rhotp',requestId:'qwerrtz5'}];

        var contacts = [];
        var groups = [];

        /**
         * Init Object
         */
        function init(){
            self.getAll();
            self.getGroups();
        }

        /**
         * Model Logic
         */
        this.searchCameoId = function(cameoId){
            return cmContacts.searchCameoId(cameoId);
        };

        this.getAll = function(limit, offset){
            var deferred = $q.defer();

            if(contacts.length < 1 && ModelUser.isAuth() !== false){
                cmContacts.getAll().then(
                    function(data){
                        contacts = data;
                        deferred.resolve(contacts);
                    },
                    function(){
                        deferred.reject();
                    }
                )
            } else {
                deferred.resolve(contacts);
            }

            return deferred.promise;
        };

        this.getQuantity = function(){
            var deferred = $q.defer();

            if(contacts.length < 1 && ModelUser.isAuth() !== false){
                this.getAll().then(
                    function(data){
                        deferred.resolve(data.length);
                    },
                    function(){
                        deferred.reject();
                    }
                )
            } else {
                deferred.resolve(contacts.length);
            }

            return deferred.promise;
        }

        this.getOne = function(id){
            return cmContacts.getOne(id);
        };

        this.getGroups = function(){
            var deferred = $q.defer();

            if(groups.length < 1 && ModelUser.isAuth() !== false){
                cmContacts.getGroups().then(
                    function(data){
                        groups = data;
                        deferred.resolve(groups);
                    },
                    function(){
                        deferred.reject();
                    }
                );
            } else {
                deferred.resolve(groups);
            }

            return deferred.promise;
        };

        this.getAllFromGroup = function(group,limit,offset){
            return cmContacts.getAllFromGroup(group,limit,offset);
        };

        this.getFriendRequests = function(){
            return cmContacts.getFriendRequests();
        };

        this.sendFriendRequest = function(id){
            return cmContacts.sendFriendRequest(id);
        };

        this.answerFriendRequest = function(id, type){
            return cmContacts.answerFriendRequest(id, type);
        };

        this.addContact = function(data){
            // TODO add to contacts and send to api
            console.log(data);

            //cmContacts.addContact({});

        };

        function resetContacts(){
            contacts = [];
            groups = [];
        }

        $rootScope.$on('logout', function(){
            resetContacts();
        });

        init();
    });
});