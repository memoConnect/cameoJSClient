/*
define([
    'cmApi',
    'cmUtil',
    'cmLogger'
], function () {
*/

'use strict';

var cmContacts = angular.module('cmContacts',[
    'cmApi',
    'cmLogger',
    'cmUser',
    'cmUtil',
    'cmLanguage'
])


cmContacts.service('cmContactsAdapter',[
    'cmApi',
    'cmLogger',
    'cmUtil',
    cmContactsAdapter
])


cmContacts.service('cmContactsModel',[
    'cmUserModel',
    'cmContactsAdapter',
    'cmLogger',
    '$q',
    '$rootScope',
    cmContactsModel
])    

cmContacts.directive('cmAddExternalContact',[
    'cmContactsModel',
    'cmLogger',
    'cmNotify',
    '$location',
    cmAddExternalContact
])

cmContacts.directive('cmContactRequestList',[
    'cmContactsModel',
    'cmLogger',
    cmContactRequestList
])

cmContacts.directive('cmContactsList',[
    'cmContactsModel',
    'cmLogger',
    cmContactsList
])

cmContacts.directive('cmSearchCameoIdentity',[
    cmSearchCameoIdentity
])

cmContacts.directive('cmTypeChooser',[
    'cmLogger',
    cmTypeChooser
])

/*
});
*/