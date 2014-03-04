define([
    'app',
    'util-base64',    
    'comps/navs/nav-tabs-drtv',
//    'cmAuth',                       //das klappt nur mit Glück!
    'ngload!pckConversations'
], function (app) {
    'use strict';
    

    console.log('Ctrl')  
  
    app.register.controller('ConversationsCtrl',[

        '$scope',
        '$rootScope',
        'cmConversationsModel',
        
        function($scope, $rootScope, cmConversationsModel) {
            $scope.conversations = cmConversationsModel;

            $rootScope.tabs = [
                {i18n:'BACK',icon:'fa-chevron-left',href:'#/start'},
                {i18n:'ADD',icon:'fa-plus',href:'#/conversation','default':true}
            ];
        }
    ]);

});