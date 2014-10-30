'use strict';

/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactEdit
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

angular.module('cmWidgets')
    .directive('cmWidgetContactEdit', [
        'cmIdentityFactory', 'cmUtil', 'cmNotify', 'cmUserModel',
        'cmContactsModel', 'cmLogger', 'cmLoader',
        '$rootScope', '$q',
        function(cmIdentityFactory, cmUtil, cmNotify, cmUserModel,
                 cmContactsModel, cmLogger, cmLoader,
                 $rootScope, $q){

            return {
                restrict:       'AE',
                scope:          {
                    contact: '=cmData'
                },
                templateUrl:    'widgets/contact/wdgt-contact-edit.html',
                controller: function($scope, $element, $attrs){
                    var loader = new cmLoader($scope);
                    //loader.start();

                    $scope.hasLocalKey = !!cmUserModel.loadLocalKeys().length;

                    $scope.formData = {
                        displayName: '',
                        phoneNumbers: [{value:''}],
                        emails: [{value:''}]
                    };

                    $scope.chooseAvatar = false;

                    $scope.isTrusted    = undefined;
                    $scope.hasKeys      = undefined;

                    $scope.isPristine = true;

                    $rootScope.$on('pristine:false', function(){
                        $scope.isPristine = false;
                    })

                    function refresh(){
                        //////////////////////
                        // set form
                        $scope.formData.displayName = $scope.contact.identity.displayName;
                        $scope.formData.phoneNumbers = [
                            {value: $scope.contact.identity.phoneNumber.value || ''}
                        ];
                        $scope.formData.emails = [
                            {value: $scope.contact.identity.email.value || ''}
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

                    $scope.validateForm = function() {
                        var deferred = $q.defer(),
                            objectChange = {};

                        if($scope.formData.displayName != '' && $scope.formData.displayName != $scope.contact.identity.displayName){
                            objectChange.displayName = $scope.formData.displayName;
                        }

                        function checkEmail() {
                            if ($scope.formData.emails.length > 0
                                && $scope.formData.emails[0].value != undefined
                                && $scope.formData.emails[0].value != $scope.contact.identity.email.value
                                && !($scope.contact.identity.email.value == undefined && $scope.formData.emails[0].value == '')) { // special case to avoid send empty email -> compares empty value with undefined identity value
                                objectChange.email = $scope.formData.emails[0].value;
                                if($scope.formData.emails[0].value != '') {
                                    objectChange.preferredMessageType = 'mail';
                                }
                            }
                        }

                        function checkPhoneNumber() {
                            if ($scope.formData.phoneNumbers.length > 0
                                && $scope.formData.phoneNumbers[0].value != undefined
                                && $scope.formData.phoneNumbers[0].value != $scope.contact.identity.phoneNumber.value
                                && !($scope.contact.identity.phoneNumber.value == undefined && $scope.formData.phoneNumbers[0].value == '')) { // special case to avoid send empty phonenumber -> compares empty value with undefined identity value
                                    objectChange.phoneNumber = $scope.formData.phoneNumbers[0].value;
                                    if($scope.formData.phoneNumbers[0].value != ''){
                                        objectChange.preferredMessageType = 'sms';
                                    }
                            }
                        }

                        checkEmail();
                        checkPhoneNumber();

                        if($scope.cmForm.$valid !== false){
                            deferred.resolve(objectChange);
                        } else {
                            deferred.reject();
                        }

                        return deferred.promise;
                    };

                    $scope.saveUser = function(){
                        if($scope.isPristine){
                            $rootScope.goBack();
                            return false;
                        }


                        if(loader.isIdle())
                            return false;

                        loader.start();

                        $scope.validateForm().then(
                            function(objectChange) {
                                $scope.contact.save(objectChange).then(
                                    function () {
                                        cmNotify.info('CONTACT.INFO.SUCCESS.EDIT', {ttl: 5000, displayType: 'modal'});
                                        $scope.isPristine = true;
                                        loader.stop();
                                    },
                                    function () {
                                        cmNotify.error('CONTACT.INFO.ERROR.EDIT', {ttl: 5000});
                                        loader.stop();
                                    }
                                );
                            },
                            function(){
                                loader.stop();
                            }
                        )
                    };

                    $scope.contact.identity.on('update:finished', refresh);

                    $scope.$on('$destroy', function(){
                        $scope.contact.identity.off('update:finished', refresh);
                    })

                }
            }
        }
    ]);