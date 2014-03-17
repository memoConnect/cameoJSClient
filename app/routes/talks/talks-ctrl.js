define([
    'app',
    'util-base64',    
    'ngload!pckUser',
    'ngload!pckConversations',
    'ngload!pckUi'
], function (app) {
    'use strict';

    app.register.controller('ConversationsCtrl',[
        '$scope',
        '$rootScope',
        'cmConversationsModel',
        function($scope, $rootScope, cmConversationsModel) {
            // define for tabs directive
            $scope.badges = {
                overview: 0
            };

            cmConversationsModel.getConversations();

            $scope.conversations = cmConversationsModel.conversations;

            /**
             * load more Conversations
             */
            $scope.loadMore = function(){
                cmConversationsModel.getConversations(cmConversationsModel.limit, cmConversationsModel.conversations.length);
            };

            /**
             * Show More Button
             * @returns {boolean}
             */
            $scope.showMore = function(){
                if(cmConversationsModel.conversations.length == 0){
                    return false;
                }

                if(cmConversationsModel.conversations.length == cmConversationsModel.quantity){
                    return false;
                }

                return true;
            };
        }
    ]);
});