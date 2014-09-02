define([
    'app',
    'ngload!pckFiles',
    'ngload!pckUser',
    'ngload!pckContacts',
    'ngload!pckConversations',
    'ngload!pckRouteConversation',
    'ngload!pckWidgets'

], function (app) {
    'use strict';

    app.register.controller('ConversationCtrl', [

        '$scope',
        '$rootScope',
        '$element',
        '$routeParams',
        '$location',
        'cmConversationFactory',
        'cmUserModel',

        function($scope, $rootScope, $element, $routeParams, $location, cmConversationFactory, cmUserModel){

            $scope.conversation =   $routeParams.conversationId
                                    ?   cmConversationFactory.create($routeParams.conversationId).load()
                                    :   $rootScope.pendingConversation || cmConversationFactory.create()

            if(!$routeParams.conversationId)
                $location.hash($location.hash + '/' + $scope.conversation.id)

            /*
            $scope.isPurl           = false;
            $scope.conversationId   = $routeParams.conversationId;
            $scope.calledWithId     = $scope.conversationId && $scope.conversationId != 'new';
            $scope.pageChild1       = $routeParams.pageChild1 || '';

            // existing conversation
            if($scope.calledWithId){
                $scope.conversation = cmConversationFactory.create($scope.conversationId);
            // pending conversation:
            } else if($rootScope.pendingConversation){

                if($rootScope.pendingConversation.id) //todo: state new?
                   $location.path('conversation/'+$rootScope.pendingConversation.id+($scope.pageChild1 ? '/'+$scope.pageChild1 : '') );
                else
                    $scope.conversation = $rootScope.pendingConversation;


            // new conversation:
            } else {
                // TODO: create at send message not on init!!! Factories should not automatically register new instances.; Done, new() will not register the new instance, do it yourself.
                $scope.conversation =   cmConversationFactory.new()
                                        .addRecipient(cmUserModel.data.identity)

            }
            */

        }
    ]);
});