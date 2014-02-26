define([
    'app',
    'util-base64',
    'mContacts',
    'comps/navs/nav-tabs-drtv',
    'comps/contacts/contacts-list-drtv'
], function (app) {
    'use strict';

    app
    .register
    .controller('ConversationCtrl', [
    '$scope',
    '$rootScope',
    '$element',
    '$routeParams',
    function($scope, $rootScope, $element, $routeParams){
        $scope.conversationId = $routeParams.conversationId;

        $rootScope.tabs = [
            {i18n:'BACK',icon:'fa-chevron-left',href:'#/talks'}
        ];

    }]);
});