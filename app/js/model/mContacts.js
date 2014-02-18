define([
    'cmContacts'
], function () {
    'use strict';

    var ModelContacts = function(cmContacts, cmLogger){
        var contacts = ['derMicha','dasEmpu'];
        var mockResults = ['derMicha','dasEmpu','dutscher','reimerei','rhotp'];
        var mockRequestResults = [{cameoId:'derMicha',requestId:'qwertz1'},{cameoId:'dasEmpu',requestId:'qwerrtz2'},{cameoId:'dutscher',requestId:'qwerrtz3'},{cameoId:'reimerei',requestId:'qwerrtz4'},{cameoId:'rhotp',requestId:'qwerrtz5'}];

        cmLogger.debug("mContacts");

        return {
            getAll: function(){
                return contacts;
            },
            getFriendRequests: function(){
                return mockRequestResults;
            }
        }
    }

    var mContacts = angular.module('mContacts',[]).factory('ModelContacts', ModelContacts);
});