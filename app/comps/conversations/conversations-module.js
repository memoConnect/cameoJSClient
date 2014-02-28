console.log('module loaded')

var cmConversations = angular.module('cmConversations', [
    'cmApi', 
    'cmLogger', 
    'cmCrypt', 
    'cmContacts'
])

cmConversations.factory('cmConversationsAdapter', [
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