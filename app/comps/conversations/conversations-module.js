'use strict';

var cmConversations = angular.module('cmConversations', [
    'cmApi', 
    'cmLogger', 
    'cmCrypt', 
    'cmContacts',
    'cmUtil'
])

cmConversations.service('cmConversationsAdapter', [
    'cmApi',
    'cmUtil',
    cmConversationsAdapter
])

cmConversations.factory('cmConversationModel',[
    'cmConversationsAdapter',
    'cmMessageFactory',
    'cmRecipientFactory',
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
    cmMessageModel
])

cmConversations.factory('cmMessageFactory',[
    '$rootScope',
    'cmMessageModel',
    cmMessageFactory
])

cmConversations.factory('cmRecipientModel',[
    'cmConversationsAdapter',
    'cmUserModel',
    'cmIdentity',
    cmRecipientModel
])

cmConversations.factory('cmRecipientFactory',[
    '$rootScope',
    'cmRecipientModel',
    'cmUtil',
    cmRecipientFactory
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
    cmConversationControls
])

cmConversations.directive('cmAttachments', [
    cmAttachments
])

cmConversations.directive('cmCaptcha',[
    cmCaptcha
])

cmConversations.directive('cmConversationSummary',[
    cmConversationSummary
])

cmConversations.directive('cmConversation', [
    'cmConversationsModel',
    'cmCrypt',
    'cmLogger',
    'cmNotify',
    '$location',
    cmConversation
])

cmConversations.directive('cmConversationInput', [
    cmConversationInput
])


cmConversations.directive('cmPasswordInput',[
    cmPasswordInput
])

cmConversations.directive('cmMessage', [
    'cmUserModel',
    cmMessage
])

cmConversations.directive('cmMessageSmall', [
    cmMessageSmall
])


.directive('cmRecipientCounter',[
    cmRecipientCounter
])


.directive('cmSafetyLevel',[
    cmSafetyLevel
])
