'use strict';

angular.module('cmRoutes').controller('ConversationCtrl', [
    '$rootScope',
    '$scope',
    '$routeParams',
    '$location',
    'cmConversationFactory',
    function($rootScope, $scope, $routeParams, $location, cmConversationFactory){

        var force_new       =   $routeParams.conversationId == 'new',
            conversation_id =   force_new ?  undefined : $routeParams.conversationId


        $scope.conversation =   conversation_id
                                ?   cmConversationFactory.create(conversation_id)
                                :   ($rootScope.pendingConversation || cmConversationFactory.new());


        if(!$scope.conversation.state.is('new') && force_new)
            $scope.conversation = cmConversationFactory.new();

        if(!conversation_id){

            $rootScope.$on('new-conversation:ready', function(){
                if($location.path().match(/\/new$/))
                    $rootScope.gotoConversation($scope.conversation.id)
            })
            
        }

    }
]);
