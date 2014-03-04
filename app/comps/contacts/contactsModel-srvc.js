/*
define([
    'mUser',
    'cmContactsAdapter',
    'cmLogger'
], function () {
    'use strict';

    
    angular.module('mContacts',[
        'cmContactsAdapter',
        'cmLogger',
        'mUser'
    ])
*/
    
function cmContactsModel(cmUserModel, cmContactsAdapter, cmLogger, $q, $rootScope){
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
    this.searchCameoIdentity = function(cameoId){
        return cmContactsAdapter.searchCameoIdentity(cameoId);
    };

    this.getAll = function(limit, offset){
        var deferred = $q.defer();

        if(contacts.length < 1 && cmUserModel.isAuth() !== false){
            cmContactsAdapter.getAll().then(
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

        if(contacts.length < 1 && cmUserModel.isAuth() !== false){
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
    };

    this.getOne = function(id){
        return cmContactsAdapter.getOne(id);
    };

    this.getGroups = function(){
        var deferred = $q.defer();

        if(groups.length < 1 && cmUserModel.isAuth() !== false){
            cmContactsAdapter.getGroups().then(
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
        return cmContactsAdapter.getAllFromGroup(group,limit,offset);
    };

    this.getFriendRequests = function(){
        return cmContactsAdapter.getFriendRequests();
    };

    this.sendFriendRequest = function(id){
        return cmContactsAdapter.sendFriendRequest(id);
    };

    this.answerFriendRequest = function(id, type){
        return cmContactsAdapter.answerFriendRequest(id, type);
    };

    this.checkDisplayName = function(displayName){
        var defer = $q.defer();
        // TODO: check displayName in local contacts
        if(displayName != 'WummsBrumms'){
            defer.resolve();
        } else {
            defer.reject();
        }

        return defer.promise;
    };

    this.addContact = function(data){
        // TODO: add to contacts and send to api
        var defer = $q.defer();
        cmContactsAdapter
        .addContact(data.identity)
        .then(
            function(data){
                contacts.push(data);
                defer.resolve();
            },
            function(){
                defer.reject();
            }
        );

        return defer.promise;
    };

    function resetContacts(){
        contacts = [];
        groups = [];
    }

    $rootScope.$on('logout', function(){
        resetContacts();
    });

    init();
}

/*
});
*/