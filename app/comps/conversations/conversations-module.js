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

cmConversations.factory('cmMessageFactory',[
    'cmCrypt',
    cmMessageFactory
])

cmConversations.factory('cmRecipientFactory',[
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
