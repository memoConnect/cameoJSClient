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

            /**
             * Welcome modal shown for new user
             */
            if(cmUserModel.comesFromRegistration !== false){
                cmUserModel.comesFromRegistration = false;

                cmModal.create({
                    id: 'welcome',
                    'cm-title': 'START.MODAL.TITLE'
                },'<div ng-bind-html="\'START.MODAL.TEXT\' | cmParse"></div>');

                cmModal.open('welcome');
            }

            /**
             * init conversations to scope
             */
            $scope.conversations = cmConversationFactory;
            $scope.conversations.getList();

//            if(cmUserModel.isAuth() === true){
//                $scope.conversations.getList();
//            }

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
                if($scope.conversations.length == 0){
                    return false;
                }

                if($scope.conversations.length == $scope.conversations.getQuantity()){
                    return false;
                }

                return true;
            };

            $scope.goToConversation = function(id){
                if(typeof id != 'undefined'){
                    $location.path('/conversation/' + id)
                }

                return false;
            };

            $scope.createNewConversation = function(){
                delete($rootScope.pendingConversation);
                $location.path('/conversation/')
            };


            /**
             * Event Handling
             */
            $scope.conversations.state.on('change',function(){
                $scope.loading = $scope.conversations.state.is('loading');
            });
        }
    ]);
});