define([
    'app',
    'cmApi',
    'util'
], function () {
   'use strict';

    var cmContacts = angular.module('cmContacts',['cmApi','cmLogger','Util']);

    cmContacts.service('cmContacts',[

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
                        url:'contact-group/' + group + Util.handleLimitOffset(limit,offset)
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
                }
            }
        }
    ])




    cmContacts.directive('cmContactsList',[

        'ModelContacts',
        'cmLogger',

        function(ModelContacts, cmLogger){
            return {

                restrict: 'AE',
                templateUrl: 'tpl/modules/contacts/cm-contacts-list.html',

                controller: function($scope, $element, $attrs){
                    $scope.contacts = null;

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

//                    $scope.contacts = [];
//
//                    $scope.getContacts = function(){
//                        $scope.contacts = cmApi.post({
//                            url: '/contacts'
//                        });
//                    };

                    $scope.editContact = function(){
                        cmLogger.debug('editContact '+cameoId);
                        // TODO: cmApi stuff
                    };

                    $scope.deleteContact = function(cameoId){
                        cmLogger.debug('deleteContact '+cameoId);
                        // TODO: cmApi stuff
                    };

                    $scope.selectIdentity = function(cameoId){
                        //communicates a cameoId to parent directives (e.g. conversation)
                        $scope.$broadcast('identity-selected', cameoId)
                    }
                }
            }
        }
    ]);
    
});