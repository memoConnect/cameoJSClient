'use strict';

angular.module('cmContacts').factory('cmFriendRequestModel',[
    'cmContactsAdapter',
    'cmLogger',
    function (cmContactsAdapter, cmLogger){
        var FriendRequestModel = function(object){
            var self = object;

            self.accept = function(){
                cmLogger.debug('cmFriendRequestModel:accept');

                return cmContactsModel.answerFriendRequest(self.identity.id, 'accept');
            };

            self.reject = function(){
                cmLogger.debug('cmFriendRequestModel:reject');

                return cmContactsModel.answerFriendRequest(self.identity.id, 'reject');
            };

            self.ignore = function(){
                cmLogger.debug('cmFriendRequestModel:ignore');

                return cmContactsModel.answerFriendRequest(self.identity.id, 'ignore');
            };

            return object
        }

        return FriendRequestModel;
    }
])