define([
    'app',
//    'ngload!pckCore',
//    'util-base64',
    'ngload!pckFiles',
    'ngload!pckUser',
    'ngload!pckContacts',
    'ngload!pckConversations'
], function (app) {
    'use strict';

    app.register.controller('ConversationCtrl', [
        '$scope',
        '$rootScope',
        '$element',
        '$routeParams',
        function($scope, $rootScope, $element, $routeParams){
            $scope.conversationId = $routeParams.conversationId;
        }
    ]);
});