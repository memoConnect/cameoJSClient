 'use strict';

var cmContacts = angular.module('cmContacts',[
    'cmApi',
    'cmLogger',
    'cmUser',
    'cmUtil',
    'cmLanguage',
    'cmIdentity'
])

cmContacts.service('cmContactsModel',[
    'cmUserModel',
    'cmContactsAdapter',
    'cmIdentityFactory',
    'cmUtil',
    '$q',
    '$rootScope',
    cmContactsModel
])

cmContacts.service('cmContactsAdapter',[
    'cmApi',
    'cmLogger',
    'cmUtil',
    cmContactsAdapter
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
    '$rootScope',
    cmContactsList
])

cmContacts.directive('cmSearchCameoIdentity',[
    'cmContactsModel',
    'cmLogger',
    cmSearchCameoIdentity
])

cmContacts.directive('cmTypeChooser',[
    'cmLogger',
    cmTypeChooser
])