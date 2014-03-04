'use strict';

var cmConversations = angular.module('cmConversations', [
    'cmApi', 
    'cmLogger', 
    'cmCrypt', 
    'cmContacts'
])

cmConversations.service('cmConversationsAdapter', [
    '$q', 
    'cmApi', 
    cmConversationsAdapter
])


cmConversations.service('cmConversationsModel', [
    'cmConversationsAdapter',
    'cmCrypt',
    '$q',
    'cmAuth',
    cmConversationsModel
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
