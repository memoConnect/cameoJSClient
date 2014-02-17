define([

    'app',
    'util-base64'

], function (app) {
    'use strict';

    app.register.controller('ConversationCtrl', [

    	'$scope',
        '$routeParams',

        function($scope, $routeParams){
        	$scope.conversation_id = $routeParams.conversationId
        }
    ])
})