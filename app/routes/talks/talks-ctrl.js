define([
    'app',
    'ngload!pckUser',
    'ngload!pckConversations',
    'ngload!pckUi',

], function (app) {
    'use strict';

    app.register.controller('ConversationsCtrl',[

        '$scope',
        '$rootScope',
        'cmUserModel',
        'cmConversationFactory',
        'cmUtil',
        'cmModal',
        '$location',

        function($scope, $rootScope, cmUserModel, cmConversationFactory, cmUtil, cmModal, $location) {
            $scope.loading = true;

            $scope.conversations = cmConversationFactory;

            $scope.conversations.state.on('change',function(){
                $scope.loading = $scope.conversations.state.get('loading');
            });

            if(cmUserModel.isAuth() === true){
//                cmConversationsModel.getConversations();
            }


            /**
             * erster Aufruf
             */
            $scope.conversations.getList();

            /**
             * load more Conversations
             */
            $scope.loadMore = function(){
                if(cmUserModel.isAuth() === true){
                    $scope.conversations.getList();
                }
            }

            /**
             * Show More Button
             * @returns {boolean}
             */
            $scope.showMore = function(){
//                if(cmConversationsModel.conversations.length == 0){
//                    return false;
//                }
//
//                if(cmConversationsModel.conversations.length == cmConversationsModel.quantity){
//                    return false;
//                }

                return true;
            }

            if(cmUserModel.comesFromRegistration !== false){
                cmUserModel.comesFromRegistration = false;

                cmModal
                .create({
                    id: 'welcome',
                    'cm-title': 'CAMEO.WELCOME'
                })
                
                cmModal.open('welcome')
            }

            

            $scope.goToConversation = function(id){
                if(typeof id != 'undefined'){
                    $location.path('/conversation/' + id)
                }

                return false;
            }

            $scope.createNewConversation = function(){
                delete($rootScope.pendingConversation);
                $location.path('/conversation/')
            }

        }
    ]);
});