define([
    'app',
    'util-base64',    
    'ngload!pckUser',
    'ngload!pckConversations'
], function (app) {
    'use strict';

    app.register.controller('ConversationsCtrl',[
        '$scope',
        '$rootScope',
//        'cmConversationsModel',
        'cmTalksModel',
//        function($scope, $rootScope, cmConversationsModel, cmTalksModel) {
        function($scope, $rootScope, cmTalksModel) {
//            $scope.conversations = cmConversationsModel;
            $scope.conversations = cmTalksModel;

            $rootScope.tabs = [
                {i18n:'BACK',icon:'fa-chevron-left',href:'#/start'},
                {i18n:'ADD',icon:'fa-plus',href:'#/conversation','default':true}
            ];
        }
    ]);
});