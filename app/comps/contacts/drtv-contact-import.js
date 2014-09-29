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

    '$rootScope', '$q',
    'cmContactsModel',
    'cmUtil',
    'cmModal',
    'cmNotify',
    'cmLocalContacts',
    'cmConversationFactory',
    'cmIdentityFactory',
    'cmTranslate',
    'cmUserModel',

    function($rootScope, $q,
             cmContactsModel, cmUtil, cmModal,
             cmNotify, cmLocalContacts, cmConversationFactory, cmIdentityFactory, cmTranslate, cmUserModel){

        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'comps/contacts/drtv-contact-import.html',

            controller: function($scope, $element, $attrs){
                $scope.cmUtil = cmUtil;

                $scope.resetErrors = function(){
                    $scope.error = {
                        displayName: false,
                        selectPhoneNumber: false,
                        selectEmail: false
                    };
                };

                $scope.chooseAvatar = true;

                $scope.reset = function(){
                    $scope.resetErrors();

                    $scope.formData = {
                        phoneNumbers: [{value:'',type:''}],
                        emails: [{value:'',type:''}]
                    };

                    $scope.identity = {
                        displayName: '',
                        phoneNumber: null,
                        email: null,
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

                            $scope.identity.displayName = contact.displayName || 'name' in contact ? contact.name.formatted : '';

                            if(contact.phoneNumbers != null && contact.phoneNumbers.length > 0) {
                                $scope.formData.phoneNumbers = contact.phoneNumbers;
                            }

                            if(contact.emails != null && contact.emails.length > 0) {
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
                    return item.value != '' && item.value == $scope.identity[type];
                };

                $scope.validateForm = function(){
                    $scope.resetErrors();

                    var deferred = $q.defer(),
                        isValid = true;

                    function checkDisplayName() {
                        if ($scope.identity.displayName == '') {
                            $scope.error.displayName = true;
                            isValid = false;
                        }
                    }

                    function checkSelection(){
                        // both is empty
                        if($scope.identity.phoneNumber == null && $scope.identity.email == null){
                            $scope.error.selectPhoneNumber = true;
                            $scope.error.selectEmail = true;
                            isValid = false;
                        }
                    }

                    checkDisplayName();
                    checkSelection();

                    if(isValid !== false){
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                $scope.importContact = function(){
                    $scope.validateForm().then(
                        function() {
                            // declaration
                            var emptyIdentity_data = {
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
                                identity = angular.extend({}, emptyIdentity_data, $scope.identity.exportData());

                            // handle preferredMessageType
                            if (identity.phoneNumber != null) {
                                identity.preferredMessageType = 'sms';
                            } else {
                                identity.phoneNumber = null;
                            }
                            if (identity.email != null) {
                                identity.preferredMessageType = 'mail';
                            } else {
                                identity.email = null;
                            }

//                            console.log(cmUtil.prettify(identity))
//                            return false;


                            // everything is fine let's add the contact
                            cmContactsModel
                                .addContact({
                                    identity: identity,
                                    groups: identity.groups
                                })
                                .then(
                                    function (data) {
                                        identity = cmIdentityFactory.create(data.identity, true)

                                        return  cmModal.confirm({
                                                    title:      '',
                                                    text:       'CONTACT.NOTIFICATION.CONFIRM',
                                                    html:       '<textarea cm-resize-textarea cm-max-rows = "10" ng-model = "data.message"></textarea>',
                                                    data:       {message: cmTranslate("CONTACT.IMPORT_NOTIFICATION", {from: cmUserModel.data.identity.getDisplayName(), to: identity.getDisplayName() })}
                                                })
                                    },
                                    function () {
                                        cmNotify.error('CONTACT.INFO.ERROR.SAVE', {ttl: 5000});
                                        return $q.reject()
                                    }
                                )
                                .then(function(modal_scope){

                                    var conversation =  cmConversationFactory
                                                        .create()
                                                        .addRecipient(identity)
                                                        .disableEncryption()

                                    return  conversation
                                            .save()
                                            .then(function(){
                                                return  conversation
                                                        .messages
                                                        .create({conversation:conversation})
                                                        .setText(modal_scope.data.message)
                                                        .setPublicData(['text'])
                                                        .encrypt()
                                                        .save()
                                            })

                                })
                                .finally(function(){
                                    $scope.gotoContactList();
                                })

                    });
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