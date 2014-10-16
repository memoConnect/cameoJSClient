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
    .directive('cmContactEdit', [

        '$rootScope',
        '$routeParams',
        'cmContactsModel',
        'cmIdentityFactory',
        'cmUtil',
        'cmNotify',
        'cmUserModel',

        function( $rootScope,$routeParams,
                  cmContactsModel, cmIdentityFactory, cmUtil, cmNotify, cmUserModel){

            return {
                restrict:       'AE',
                scope:          {
                    contactId: '=cmContactId'
                },
                templateUrl:    'comps/contacts/drtv-contact-edit.html',

                controller: function($scope, $element, $attrs){
                    $scope.cmUtil = cmUtil;

                    $scope.formData = {
                        phoneNumbers: [{value:''}],
                        emails: [{value:''}]
                    };

                    $scope.chooseAvatar = false;
                    cmContactsModel.getOne($scope.contactId).then(
                        function (data) {
                            // set data froom api
                            $scope.contact = data;
                            // get identity model
                            $scope.identity = cmIdentityFactory.create(data.identity,true);

                            //////////////////////
                            // TODO: mock workarround json in array
                            $scope.formData.phoneNumbers = [
                                    $scope.identity.phoneNumber || {value:''}
                            ];
                            $scope.formData.emails = [
                                    $scope.identity.email || {value:''}
                            ];
                            //////////////////////

                            // cameo user can't edit only extern end local
                            $scope.disabled = data.contactType == 'internal' ? true : false;

                            if(!$scope.disabled){
                                $scope.showCameoId = true;
                            } else {
                                $scope.showCameoId = false;
                            }
                        }
                    );

                    /**
                     * handle every single contact via model
                     */
                    $scope.startConversation = function () {
                        if($scope.contact.contactType != 'pending'){
                            delete $rootScope.pendingConversation;
                            if ($scope.identity) {
                                $rootScope.pendingRecipients = [$scope.identity]
                            } else {
                                cmLogger.error('Unable to find identity on contact. ' + $scope.contact)
                            }
                            $rootScope.goTo('/conversation/new');
                        }
                    };

                    $scope.goToAuthentication = function(identity){
                        if(identity.userType != 'external' && identity.publicKeys.length > 0){
                            $rootScope.goTo('authentication/identity/' + identity.id);
                        }
                    };

                    $scope.saveUser = function(){
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
                            return false;
                        }

                        // everything is fine let's add the contact
                        cmContactsModel
                        .editContact($routeParams.id, identity)
                        .then(
                            function () {
                                cmNotify.info('CONTACT.INFO.SUCCESS.EDIT',{ttl:5000,displayType:'modal'});
                            },
                            function () {
                                cmNotify.error('CONTACT.INFO.ERROR.EDIT',{ttl:5000});
                            }
                        );
                    };

                    $scope.startTrustHandshake = function(){
                        cmHooks.openKeyRequest($scope.identity);
                    };

                    $scope.getTrust = function(){
                        return $scope.identity && cmUserModel.verifyTrust($scope.identity);
                    };

                    $scope.hasKey = function(){
                        return $scope.identity && $scope.identity.keys.length > 0;
                    };

                    $scope.hasLocalKey = !!cmUserModel.loadLocalKeys().length;
                }
            }
        }
    ]);