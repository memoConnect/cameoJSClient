define([
    'app',
    'cmContacts'
], function () {
    'use strict';

    var ModelContacts = function(cmContacts, cmLogger, $q){
        var contacts = [];

        var mockContacts = ['derMicha','dasEmpu'];
        var mockResults = ['derMicha','dasEmpu','dutscher','reimerei','rhotp'];
        var mockRequestResults = [{cameoId:'derMicha',requestId:'qwertz1'},{cameoId:'dasEmpu',requestId:'qwerrtz2'},{cameoId:'dutscher',requestId:'qwerrtz3'},{cameoId:'reimerei',requestId:'qwerrtz4'},{cameoId:'rhotp',requestId:'qwerrtz5'}];

        cmLogger.debug("mContacts");

        /**
         * Model Logic
         */
        return {
            searchCameoId: function(cameoId){
                return cmContacts.searchCameoId(cameoId);
            },
            getAll: function(limit, offset){
                var deferred = $q.defer();

                if(contacts.length < 1){
                    cmContacts.getAll(limit, offset).then(
                        function(data){
                            contacts = data;
                            deferred.resolve(contacts);
                        },
                        function(){
                            deferred.reject();
                        }
                    )
                }

                return deferred.promise;
            },
            getOne: function(id){
                return cmContacts.getOne(id);
            },
            getGroups: function(){
                return cmContacts.getGroups();
            },
            getAllFromGroup: function(group,limit,offset){
                return cmContacts.getAllFromGroup(group,limit,offset);
            },
            getFriendRequests: function(){
                return cmContacts.getFriendRequests();
            },
            sendFriendRequest: function(id){
                return cmContacts.sendFriendRequest(id);
            },
            answerFriendRequest: function(id, type){
                return cmContacts.answerFriendRequest(id, type);
            }
        }
    }

    var mContacts = angular.module('mContacts',[]).factory('ModelContacts', ModelContacts);
});