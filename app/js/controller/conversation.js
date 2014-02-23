define([

    'app',
    'util-base64',
    'mContacts',
    '_d/contactsListDirv'

], function (app) {
    'use strict';

    app.register.controller('ConversationCtrl', [

    	'$scope',
        '$element',
        '$routeParams',        

        function($scope, $element, $routeParams){               
        	$scope.conversationId = $routeParams.conversationId      
        }
    ])
})