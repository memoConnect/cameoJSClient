'use strict';

/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactEdit
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams

angular.module('cmWidgets')
    .directive('cmWidgetContactEdit', [

        '$rootScope',
        '$routeParams',
        '$timeout',
        'cmIdentityFactory',
        'cmUtil',
        'cmNotify',
        'cmUserModel',
        'cmLogger',

        function( $rootScope,$routeParams, $timeout,
                  cmIdentityFactory, cmUtil, cmNotify, cmUserModel, cmLogger){

            return {
                restrict:       'AE',
                scope:          {
                    contact: '=cmData'
                },
                templateUrl:    'widgets/contact/wdgt-contact-edit.html',

                controller: function($scope, $element, $attrs){
                    $scope.cmUtil = cmUtil;

                    $scope.hasLocalKey = !!cmUserModel.loadLocalKeys().length;

                    $scope.formData = {
                        phoneNumbers: [{value:''}],
                        emails: [{value:''}]
                    };

                    $scope.chooseAvatar = false;

                    $scope.isTrusted    = undefined;
                    $scope.hasKeys      = undefined;


                    function refresh(){
                        //////////////////////
                        // TODO: mock workarround json in array
                        $scope.formData.phoneNumbers = [
                            $scope.contact.identity.phoneNumber || {value:''}
                        ];
                        $scope.formData.emails = [
                            $scope.contact.identity.email || {value:''}
                        ];
                        //////////////////////

                        $scope.hasLocalKey = !!cmUserModel.loadLocalKeys().length;

                        $scope.chooseAvatar = false;

                        $scope.isTrusted    = undefined;
                        $scope.hasKeys      = undefined;

                        $scope.disabled = $scope.contact.contactType == 'internal' ? true : false;

                        if(!$scope.disabled){
                            $scope.showCameoId = true;
                        } else {
                            $scope.showCameoId = false;
                        }

                        $scope.hasKeys = ($scope.contact.identity.keys.length > 0);
                        
                        cmUserModel.verifyTrust($scope.contact.identity)
                        .then(function(){
                            $scope.isTrusted = true;
                        });
                    }
                    
                    refresh();

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
                        if(identity.userType != 'external' && identity.keys.length > 0){
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

                    $scope.contact.identity.on('update:finished', refresh)

                    $scope.$on('$destroy', function(){
                        $scope.contact.identity.off('update:finished', refresh)
                    })

                }
            }
        }
    ]);