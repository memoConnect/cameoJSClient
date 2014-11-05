'use strict';

/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

angular.module('cmContacts')
.directive('cmContactImport', [

    'cmContactsModel', 'cmUtil', 'cmModal', 'cmNotify',
    'cmLocalContacts', 'cmConversationFactory', 'cmIdentityFactory', 'cmTranslate',
    'cmUserModel', 'cmLoader',
    '$rootScope', '$q', '$filter',

    function(cmContactsModel, cmUtil, cmModal, cmNotify,
             cmLocalContacts, cmConversationFactory, cmIdentityFactory, cmTranslate,
             cmUserModel, cmLoader,
             $rootScope, $q, $filter){

        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'comps/contacts/drtv-contact-import.html',

            controller: function($scope, $element, $attrs){
                $scope.cmUtil = cmUtil;
                var loader = new cmLoader($scope);

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
                            if($scope.identity.phoneNumber != item.value)
                                $scope.identity.phoneNumber = item.value;
                            else
                                $scope.identity.phoneNumber = '';
                        break;
                        case 'email':
                            if($scope.identity.email != item.value)
                                $scope.identity.email = item.value;
                            else
                                $scope.identity.email = '';
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
                    if(loader.isIdle())
                        return false;

                    loader.start();

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

                            // everything is fine let's add the contact
                            cmContactsModel
                            .addContact({
                                identity: identity,
                                groups: identity.groups
                            })
                            .then(
                                function (data) {
                                    loader.stop();
                                    identity = cmIdentityFactory.create(data.identity, true);

                                    var messageData = {
                                        from: cmUserModel.data.identity.getDisplayName(),
                                        to: identity.getDisplayName()
                                    };

                                    return  cmModal.confirm({
                                                title: '',
                                                text:  'CONTACT.IMPORT.NOTIFICATION.CONFIRMATION',
                                                html:  '<textarea cm-resize-textarea class="confirm-textarea" ng-model="data.message"> </textarea>',
                                                data:  {
                                                    message: $filter('cmTranslate')('CONTACT.IMPORT.NOTIFICATION.MESSAGE',messageData)
                                                }
                                            })
                                },
                                function () {
                                    loader.stop();
                                    cmNotify.error('CONTACT.INFO.ERROR.SAVE', {ttl: 5000});
                                    return $q.reject()
                                }
                            )
                            .then(function(modal_scope){
                                var conversation =  cmConversationFactory
                                                    .create()
                                                    .addRecipient(identity)
                                                    .disableEncryption();

                                return  conversation
                                        .save()
                                        .then(function(){
                                            return  conversation
                                                    .messages
                                                    .create({conversation:conversation,text:modal_scope.data.message})
                                                    .setPublicData(['text'])
                                                    .save()
                                        })

                            })
                            .finally(function(){
                                loader.stop();
                                $scope.gotoContactList();
                            })

                        },
                        function(){
                            loader.stop();
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