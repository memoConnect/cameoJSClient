'use strict';

var cmConversations = angular.module('cmConversations', [
    'cmApi', 
    'cmLogger', 
    'cmCrypt', 
    'cmContacts',
    'cmUtil',    
    'cmIdentity',
    'cmUserModel',
    'ui.bootstrap'
])

cmConversations.service('cmConversationsAdapter', [
    'cmApi',
    'cmUtil',
    cmConversationsAdapter
])

cmConversations.factory('cmConversationModel',[
    'cmConversationsAdapter',
    'cmMessageFactory',
    'cmIdentityFactory',
    cmConversationModel
]);

cmConversations.factory('cmConversationFactory',[
    '$rootScope',
    'cmConversationModel',
    cmConversationFactory
])

cmConversations.factory('cmMessageModel',[
    'cmConversationsAdapter',
    'cmCrypt',
    'cmIdentityFactory',
    'cmUserModel',
    cmMessageModel
])

cmConversations.factory('cmMessageFactory',[
    '$rootScope',
    'cmMessageModel',
    cmMessageFactory
])

cmConversations.service('cmConversationsModel', [
    'cmConversationsAdapter',
    'cmConversationFactory',
    '$q',
    '$rootScope',
    cmConversationsModel
])

cmConversations.service('cmPurlModel',[
    'cmConversationsAdapter',
    'cmConversationsModel',
    'cmConversationFactory',
    'cmUserModel',
    'cmAuth',
    '$q',
    '$rootScope',
    cmPurlModel
])

cmConversations.directive('cmConversationControls', [
    '$modal',
    cmConversationControls
])

cmConversations.directive('cmAttachments', [
    cmAttachments
])

cmConversations.directive('cmCaptcha',[
    cmCaptcha
])

cmConversations.directive('cmConversationTag',[
    cmConversationTag
])

cmConversations.directive('cmConversation', [
    'cmConversationsModel',
    'cmMessageFactory',
    'cmUserModel',
    'cmCrypt',
    'cmLogger',
    'cmNotify',
    '$location',
    cmConversation
])

cmConversations.directive('cmPasswordInput',[
    cmPasswordInput
])

cmConversations.directive('cmMessage', [
    'cmUserModel',
    cmMessage
])

.directive('cmRecipientCounter',[
    cmRecipientCounter
])


.directive('cmSafetyLevel',[
    cmSafetyLevel
])
