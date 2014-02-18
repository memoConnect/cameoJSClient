define([
    'app'
], function () {
   'use strict';

    var cmContacts = angular.module('cmContacts',['cmApi','cmLogger']);

    cmContacts.service('cmContacts',[
        'cmApi',
        'cmLogger',
        function(cmApi, cmLogger){

            cmLogger.debug('cmContacts');
            /**
             * Creates a String for Limit-Offset Handling in Api-Calls
             * @param limit
             * @param offset
             * @returns {string}
             */
            function handleLimitOffset(limit,offset){
                var s = '';

                if(angular.isDefined(limit)){
                    s = '?limit=' + parseInt(limit);
                } else {
                    //default limit
                }

                if(s != '' && angular.isDefined(offset)){
                    s += '&offset=' + parseInt(offset);
                }

                return s;
            }

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
                        url:'/contacts' + handleLimitOffset(limit,offset)
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
                        url:'contact-groups'
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
                        url:'contact-group/' + group + handleLimitOffset(limit,offset)
                    })
                },
                getFriendRequests: function(){
                    return cmApi.get({
                        url:'identity/friendRequests'
                    })
                },
                sendFriendRequest: function(id){
                    return cmApi.post({
                        url:'/identity/friendRequest',
                        data: {cameoId: id}
                    })
                },
                answerFriendRequest: function(requestId, type){
                    return cmApi.post({
                        url:'/identity/friendRequest/' + requestId,
                        data: {type:type}
                    })
                }
            }
        }
    ])
});