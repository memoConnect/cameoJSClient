'use strict';

angular.module('cmContacts').factory('cmFriendRequestModel',[
    'cmContactsAdapter',
    'cmIdentityFactory',
    'cmObject',
    'cmLogger',
    function (cmContactsAdapter, cmIdentityFactory, cmObject, cmLogger){
        var FriendRequestModel = function(data){

            this.message        = '';
            this.timeOfCreation = 0;
            this.identity       = undefined;
            this.id             = undefined;

            this.accept = function(){
                cmLogger.debug('cmFriendRequestModel:accept');

                return cmContactsAdapter.answerFriendRequest(this.identity.id, 'accept');
            };

            this.reject = function(){
                cmLogger.debug('cmFriendRequestModel:reject');

                return cmContactsAdapter.answerFriendRequest(this.identity.id, 'reject');
            };

            this.ignore = function(){
                cmLogger.debug('cmFriendRequestModel:ignore');

                return cmContactsAdapter.answerFriendRequest(this.identity.id, 'ignore');
            };

            this.importData = function(data){
                this.identity       = 'identity' in data ? cmIdentityFactory.create(data.identity) : this.identity 
                this.message        = data.message || this.message
                this.timeOfCreation = data.created || this.timeOfCreation
                this.id             = this.identity && this.identity.id
            };

            cmObject.addEventHandlingTo(this)
            this.importData(data)
        }

        return FriendRequestModel;
    }
])