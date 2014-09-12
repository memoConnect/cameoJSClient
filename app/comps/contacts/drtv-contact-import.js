'use strict';

/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams

angular.module('cmContacts')
.directive('cmContactImport', [

    '$rootScope', '$routeParams',
    'cmContactsModel',
    'cmIdentityFactory',
    'cmUtil',
    'cmNotify',
    'cmHooks',
    'cmUserModel',
    'cmLocalContacts',

    function($rootScope, $routeParams,
             cmContactsModel, cmIdentityFactory, cmUtil,
             cmNotify, cmHooks, cmUserModel,
             cmLocalContacts){

        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'comps/contacts/drtv-contact-import.html',

            controller: function($scope, $element, $attrs){
                $scope.cmUtil = cmUtil;

                $scope.chooseAvatar = true;

                $scope.reset = function(){
                    $scope.formData = {
                        phoneNumbers: [{value:'',type:''}],
                        emails: [{value:'',type:''}]
                    };

                    $scope.identity = {
                        displayName: '',
                        phoneNumber: '',
                        email: '',
                        exportData: function(){
                            return {
                                displayName: this.displayName,
                                phoneNumber: this.phoneNumber,
                                email: this.email
                            }
                        }
                    };
                };

                $scope.chooseContact = function(){
                    cmLocalContacts.selectOne().then(
                        function (contact) {
                            $scope.reset();

                            if(contact.displayName == '')
                                contact.displayName = undefined;

                            $scope.identity.displayName = contact.displayName || contact.name.formatted;

                            if(contact.phoneNumbers.length > 0) {
                                $scope.formData.phoneNumbers = contact.phoneNumbers;
                            }

                            if(contact.emails.length > 0) {
                                $scope.formData.emails = contact.emails;
                            }

                            //$scope.identity.avatar = contact.photos.length > 0 ? contact.photos[0].value : null
                        }
                    )
                };

                $scope.chooseItem = function(item, type){
                    switch(type){
                        case 'phone':
                            $scope.identity.phoneNumber = item.value;
                        break;
                        case 'email':
                            $scope.identity.email = item.value;
                        break;
                    }
                };

                $scope.isSelected = function(item, type){
                    return item.value != '' && item.value == identity[type];
                };

                $scope.importContact = function(){
                    // declaration
                    var emptyIdentity = {
                        displayName: null,
                        phoneNumber: null,
                        email: null,
                        preferredMessageType: 'default',
                        // TODO: not implemented in BE
                        name: null,
                        surName: null,
                        phoneProvider: null,
                        groups: []
                    },
                    // merge given identity with default
                    identity = angular.extend({}, emptyIdentity, $scope.identity.exportData());

                    // handle preferredMessageType
                    if(identity.phoneNumber != null){
                        identity.preferredMessageType = 'sms';
                    } else {
                        identity.phoneNumber = null;
                    }
                    if(identity.email != null){
                        identity.preferredMessageType = 'mail';
                    } else {
                        identity.email = null;
                    }

                    //////////////////////
                    if($scope.cmForm.$invalid){
                        return false;
                    }

                    // everything is fine let's add the contact
                    cmContactsModel
                        .addContact({
                            identity: identity,
                            groups: identity.groups
                        })
                        .then(
                        function () {
                            $scope.gotoContactList();
                        },
                        function () {
                            cmNotify.error('CONTACT.INFO.ERROR.SAVE',{ttl:5000});
                        }
                    );
                };

                $scope.reset();

                // init
                if(cmLocalContacts.canRead()) {
                    $scope.chooseContact();
                } else {
                    $rootScope.goBack();
                    return false;
                }
            }
        }
    }
]);