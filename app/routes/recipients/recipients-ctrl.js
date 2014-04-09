define([

    'app',

], function (app) {
    'use strict';

    app.register.controller('RecipientCtrl', [

        '$scope',
        '$rootScope',

        function ($scope, $rootScope) {
            $conversationsModel.getConversation($routeParams.conversationId)
            $scope.conversation = $rootScope.pendingConversation
        }
    ])
})
