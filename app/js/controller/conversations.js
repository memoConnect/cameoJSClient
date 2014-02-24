define([

    'app',
    'cmConversations',
    'util-base64'

], function (app) {
    'use strict';
    
    app.register.controller('ConversationsCtrl',[

        '$scope',
        'cmConversationsModel',

        function($scope, cmConversationsModel) {
            $scope.conversations = cmConversationsModel
        }

    ])

})
