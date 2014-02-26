define([
    'app',
    'cmApi',
    'util'
], function () {
   'use strict';

    var cmContacts = angular.module('cmContacts',['cmApi','cmLogger','Util']);

    cmContacts
    .service('cmContacts',[
    'cmApi',
    'cmLogger',
    'Util',
    function(cmApi, cmLogger, Util){
        return {
            /**
             * Search for cameoId Users
             * @param string
             * @returns {*|HttpPromise}
             */
            searchCameoId: function(string){
                return cmApi.post({
                    url:'/identity/search',
                    data: {
                        cameoId: string
                    }
                });
            },
            /**
             * Get Contact List
             * @param limit
             * @param offset
             * @returns {*|Array|Object|Mixed|promise|!webdriver.promise.Promise}
             */
            getAll: function(limit, offset){
                return cmApi.get({
                    url:'/contacts' + Util.handleLimitOffset(limit,offset)
                });
            },
            /**
             * Get one Contact in Detail
             * @param id
             * @returns {*|Array|Object|Mixed|promise|!webdriver.promise.Promise}
             */
            getOne: function(id){
                return cmApi.get({
                    url:'/contact/'+id
                })
            },
            /**
             * Get User Groups
             * @returns {*|Array|Object|Mixed|promise|!webdriver.promise.Promise}
             */
            getGroups: function(){
                return cmApi.get({
                    url:'/contact-groups'
                })
            },
            /**
             * Get User from one User Group
             * @param group
             * @param limit
             * @param offset
             * @returns {*|Array|Object|Mixed|promise|!webdriver.promise.Promise}
             */
            getAllFromGroup: function(group,limit,offset){
                return cmApi.get({
                    url:'/contact-group/' + group + Util.handleLimitOffset(limit,offset)
                })
            },
            getFriendRequests: function(){
                return cmApi.get({
                    url:'/friendRequests'
                })
            },
            sendFriendRequest: function(id){
                return cmApi.post({
                    url:'/friendRequest',
                    data: {identityId: id}
                })
            },
            answerFriendRequest: function(id, type){
                return cmApi.post({
                    url:'/friendRequest/answer',
                    data: {identityId:id, answerType:type}
                })
            },
            addContact: function(data){
                return cmApi.post({
                    url:'/contact',
                    data: {identity:data, groups:[]}
                })
            }
        }
    }]);
});