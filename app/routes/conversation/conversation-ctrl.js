define([
    'app',
    'ngload!pckFiles',
    'ngload!pckUser',
    'ngload!pckContacts',
    'ngload!pckConversations',
    'ngload!pckRouteConversation'
], function (app) {
    'use strict';

    app.register.controller('ConversationCtrl', [
        '$scope',
        '$rootScope',
        '$element',
        '$routeParams',
        function($scope, $rootScope, $element, $routeParams){
            $scope.conversationId = $routeParams.conversationId;

            $scope.pageChild1 = $routeParams.pageChild1 || '';
        }
    ]);
});