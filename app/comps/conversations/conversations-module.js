'use strict';

var cmConversations = angular.module('cmConversations', [
    'cmApi', 
    'cmLogger', 
    'cmCrypt', 
    'cmContacts'
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
    'cmConversationModel',
    cmConversationFactory
])

cmConversations.factory('cmMessageModel',[
    'cmConversationsAdapter',
    'cmCrypt',
    cmMessageModel
])

cmConversations.factory('cmMessageFactory',[
    'cmMessageModel',
    cmMessageFactory
])

cmConversations.factory('cmRecipientModel',[
    'cmConversationsAdapter',
    cmRecipientModel
])

cmConversations.factory('cmRecipientFactory',[
    'cmRecipientModel',
    cmRecipientFactory
])

cmConversations.service('cmConversationsModel', [
    'cmConversationsAdapter',
    'cmConversationFactory',
    '$q',
    cmConversationsModel
])

cmConversations.service('cmTalksModel', [
    'cmConversationsAdapter',
    'cmMessageFactory',
    cmTalksModel
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
    'cmAuth',
    cmMessage
])
