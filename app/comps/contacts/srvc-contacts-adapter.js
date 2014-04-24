'use strict';

angular.module('cmContacts').service('cmContactsAdapter',[
    'cmApi',
    'cmLogger',
    'cmUtil',
    function (cmApi, cmLogger, cmUtil){
        return {
            /**
             * Search for cameoId Users
             * @param string
             * @returns {*|HttpPromise}
             */
            searchCameoIdentity: function(string, excludeContacts){
                return cmApi.post({
                    url:'/identity/search',
                    data: {
                        search: string,
                        fields: ['cameoId','displayName'],
                        excludeContacts: excludeContacts || true
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
                    url:'/contacts' + cmUtil.handleLimitOffset(limit,offset)
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
                    url:'/contact-group/' + group + cmUtil.handleLimitOffset(limit,offset)
                })
            },
            getFriendRequests: function(){
                return cmApi.get({
                    url:'/friendRequests'
                })
            },
            sendFriendRequest: function(id, message){
                return cmApi.post({
                    url:'/friendRequest',
                    data: {identityId: id, message: message || null}
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
                    data: {identity:data.identity||{}, groups:data.groups||[]}
                })
            },
            editContact: function(id, data){
                return cmApi.put({
                    url:'/contact/'+id,
                    data: data||{}
                })
            },
            deleteContact: function(id){
                return cmApi.delete({
                    url:'/contact/'+id
                })
            }
        }
    }
]);