'use strict';

angular.module('cmRoutes').controller('ConversationCtrl', [
    '$rootScope',
    '$scope',
    '$routeParams',
    '$location',
    '$timeout',
    'cmConversationFactory',
    function($rootScope, $scope, $routeParams, $location, $timeout,
             cmConversationFactory){

        var force_new       =   $routeParams.conversationId == 'new',
            conversation_id =   force_new ?  undefined : $routeParams.conversationId;

        $scope.conversation =   conversation_id
                                ?   cmConversationFactory.create(conversation_id)
                                :   ($rootScope.pendingConversation || cmConversationFactory.new())


        if(!$scope.conversation.state.is('new') && force_new)
            $scope.conversation = cmConversationFactory.new()

        if(!conversation_id){
            $scope.$watchCollection('conversation', function(conversation){
                if(conversation.id)
                    $rootScope.goto('conversation/' + conversation.id)
            })
        }
    }
]);