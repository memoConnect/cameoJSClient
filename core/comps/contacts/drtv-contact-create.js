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
    .directive('cmContactCreate', [
        'cmContactsModel', 'cmIdentityFactory', 'cmUtil', 'cmNotify', 'cmLoader',
        function(cmContactsModel, cmIdentityFactory, cmUtil, cmNotify, cmLoader){

            return {
                restrict:       'AE',
                scope:          true,
                templateUrl:    'comps/contacts/drtv-contact-create.html',

                controller: function($scope, $element, $attrs){
                    $scope.cmUtil = cmUtil;
                    var loader = new cmLoader($scope);
                    $scope.formData = {
                        phoneNumbers: [{value:''}],
                        emails: [{value:''}]
                    };

                    $scope.contact = {};
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
                    $scope.disabled = false;
                    $scope.chooseAvatar = true;
                    $scope.showCameoId = true;

                    /**
                     * handle every single contact via model
                     */

                    $scope.saveUser = function(){
                        if(loader.isIdle())
                            return false;

                        loader.start();

                        // declaration
                        var emptyIdentity = {
                                displayName: null,
                                email: null,
                                phoneNumber: null,
                                preferredMessageType: 'default',
                                // TODO: not implemented in BE
                                name: null,
                                surName: null,
                                phoneProvider: null,
                                groups: []
                            },
                        // merge given identity with default
                            identity = angular.extend({}, emptyIdentity, $scope.identity.exportData());

                        // validation
                        //////////////////////
                        // TODO: mock workarround for multiinput from array to single string
                        if($scope.formData.phoneNumbers.length > 0 && $scope.formData.phoneNumbers[0].value != ''){
                            identity.phoneNumber = $scope.formData.phoneNumbers[0].value;
                            identity.preferredMessageType = 'sms';
                        } else {
                            identity.phoneNumber = null;
                        }
                        if($scope.formData.emails.length > 0 && $scope.formData.emails[0].value != ''){
                            identity.email = $scope.formData.emails[0].value;
                            identity.preferredMessageType = 'mail';
                        } else {
                            identity.email = null;
                        }
                        //////////////////////
                        if($scope.cmForm.$invalid){
                            loader.stop();
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
                                loader.stop();
                                cmNotify.error('CONTACT.INFO.ERROR.SAVE',{ttl:5000});
                            }
                        );
                    };
                }
            }
        }
    ]);