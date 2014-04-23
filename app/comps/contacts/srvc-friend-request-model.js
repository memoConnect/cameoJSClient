'use strict';

angular.module('cmContacts').factory('cmFriendRequestModel',[
    'cmContactsAdapter',
    'cmLogger',
    function (cmContactsAdapter, cmLogger){
        var FriendRequestModel = function(object){
            var self = object;

            self.accept = function(){
                cmLogger.debug('cmFriendRequestModel:accept');

                return cmContactsAdapter.answerFriendRequest(self.identity.id, 'accept');
            };

            self.reject = function(){
                cmLogger.debug('cmFriendRequestModel:reject');

//                return cmContactsAdapter.answerFriendRequest(self.identity.id, 'reject');
                return self;
            };

            self.ignore = function(){
                cmLogger.debug('cmFriendRequestModel:ignore');

//                return cmContactsAdapter.answerFriendRequest(self.identity.id, 'ignore');
                return self;
            };

            return object
        }

        return FriendRequestModel;
    }
])