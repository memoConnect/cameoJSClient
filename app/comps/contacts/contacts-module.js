 'use strict';

var cmContacts = angular.module('cmContacts',[
    'cmApi',
    'cmLogger',
    'cmUser',
    'cmUtil',
    'cmLanguage',
    'cmIdentity',
    'cmObject'
])

cmContacts.service('cmContactsModel',[
    'cmUserModel',
    'cmContactsAdapter',
    'cmIdentityFactory',
    'cmUtil',
    'cmObject',
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
    'cmNotify',
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
    'cmNotify',
    cmSearchCameoIdentity
])

cmContacts.directive('cmContactsFilterControls',[
    cmContactsFilterControls   
])

cmContacts.directive('cmContactTag',[
    cmContactTag
])

cmContacts.directive('cmContactBrief', [
    cmContactBrief
])

cmContacts.directive('cmKeyLevel',[
    cmKeyLevel
])

cmContacts.directive('cmTypeChooser',[
    'cmLogger',
    cmTypeChooser
])