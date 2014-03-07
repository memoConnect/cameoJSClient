'use strict';

var cmConversations = angular.module('cmConversations', [
    'cmApi', 
    'cmLogger', 
    'cmCrypt', 
    'cmContacts',
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
    'cmAuth',
    cmRecipientModel
])

cmConversations.factory('cmRecipientFactory',[
    '$rootScope',
    'cmRecipientModel',
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
    'cmConversationFactory',
    'cmUserModel',
    '$q',
    '$rootScope',
    cmPurlModel
])

cmConversations.directive('cmAttachments', [
    cmAttachments
])

cmConversations.directive('cmCaptcha',[
    cmCaptcha
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


cmConversations.directive('cmPassphrase',[
    cmPassphrase
])

cmConversations.directive('cmAvatar', [
    cmAvatar
])

cmConversations.directive('cmMessage', [
    'cmUserModel',
    cmMessage
])

cmConversations.directive('cmMessageSmall', [
    cmMessageSmall
])