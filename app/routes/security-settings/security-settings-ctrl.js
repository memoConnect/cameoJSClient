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

    app.register.controller('SecuritySettingsCtrl', [

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
                                    :   ($rootScope.pendingConversation || cmConversationFactory.create())


            if(!$scope.conversation.state.is('new') && force_new)
                $scope.conversation = cmConversationFactory.create()

            if(!$routeParams.conversationId && $scope.conversation.id)
                $location.path($location.path() + '/' + $routeParams.conversationId)

        }
    ]);
});