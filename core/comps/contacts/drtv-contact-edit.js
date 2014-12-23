'use strict';

/**
 * @ngdoc directive
 * @name cmContacts.directive:cmContactEdit
 * @description
 * contact form
 *
 * @restrict E
 */

angular.module('cmContacts')
.directive('cmContactEdit', [
    'cmIdentityFactory', 'cmUtil', 'cmNotify', 'cmUserModel',
    'cmContactsModel', 'cmLogger', 'cmLoader', 'cmPristine',
    '$rootScope', '$q', '$timeout',
    function(cmIdentityFactory, cmUtil, cmNotify, cmUserModel,
             cmContactsModel, cmLogger, cmLoader, cmPristine,
             $rootScope, $q, $timeout){

        return {
            restrict: 'E',
            scope: {
                contact: '=cmData'
            },
            templateUrl: 'comps/contacts/drtv-contact-edit.html',
            controller: function ($scope, $element, $attrs) {
                var loader = new cmLoader($scope);

                $scope.hasLocalKey = !!cmUserModel.loadLocalKeys().length;

                $scope.chooseAvatar = false;

                $scope.isTrusted = undefined;
                $scope.hasKeys = undefined;

                function reset(){
                    $scope.formData = {
                        displayName: $scope.contact.identity.displayName,
                        phoneNumber: $scope.contact.identity.phoneNumber.value,
                        mergedPhoneNumber: '',
                        email: $scope.contact.identity.email.value
                    };

                    $scope.hasLocalKey = !!cmUserModel.loadLocalKeys().length;

                    $scope.chooseAvatar = false;

                    $scope.isTrusted = undefined;
                    $scope.hasKeys = undefined;

                    $scope.disabled = $scope.contact.contactType == 'internal' ? true : false;

                    if (!$scope.disabled) {
                        $scope.showCameoId = true;
                    } else {
                        $scope.showCameoId = false;
                    }

                    $scope.hasKeys = ($scope.contact.identity.keys.length > 0);

                    cmUserModel.verifyTrust($scope.contact.identity)
                        .then(function () {
                            $scope.isTrusted = true;
                        });
                }

                $scope.contact.identity.on('update:finished', reset);

                $scope.$on('$destroy', function () {
                    $scope.contact.identity.off('update:finished', reset);
                });

                reset();



                /**
                 * handle every single contact via model
                 */
                $scope.startConversation = function () {
                    if ($scope.contact.contactType != 'pending') {
                        delete $rootScope.pendingConversation;
                        if ($scope.identity) {
                            $rootScope.pendingRecipients = [$scope.identity]
                        } else {
                            cmLogger.error('Unable to find identity on contact. ' + $scope.contact)
                        }
                        $rootScope.goTo('/conversation/new');
                    }
                };

                $scope.goToAuthentication = function (identity) {
                    if (identity.userType != 'external' && identity.keys.length > 0) {
                        $rootScope.goTo('authentication/identity/' + identity.id);
                    }
                };

                $scope.validateForm = function () {
                    var deferred = $q.defer(),
                        objectChange = {};

                    function checkDisplayName() {
                        var value = $scope.formData.displayName;
                        if (value != $scope.contact.identity.displayName) {
                            objectChange.displayName = value;
                        }
                    }

                    function checkPhoneNumber() {
                        var defValue = $scope.contact.identity.phoneNumber,
                            value = $scope.formData.mergedPhoneNumber;
                        if (value != undefined
                            && defValue && value != defValue.value) {
                            objectChange.phoneNumber = value;
                        }
                    }

                    function checkEmail() {
                        var defValue = $scope.contact.identity.email,
                            value = $scope.formData.email;
                        if (value != undefined
                            && defValue && value != defValue.value) {
                            objectChange.email = value;
                        }
                    }

                    checkDisplayName();
                    checkPhoneNumber();
                    checkEmail();

                    if ($scope.cmForm.$valid !== false && Object.keys(objectChange).length > 0) {
                        deferred.resolve(objectChange);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                $scope.saveUser = function () {
                    if ($scope.isPristine) {
                        $rootScope.goBack();
                        return false;
                    }

                    if (loader.isIdle())
                        return false;

                    loader.start();

                    $scope.validateForm().then(
                        function (objectChange) {

                            $scope.contact.save(objectChange).then(
                                function () {
                                    $scope.isPristine = true;
                                    reset();
                                    loader.stop();
                                },
                                function () {
                                    cmNotify.error('CONTACT.INFO.ERROR.EDIT', {ttl: 5000});
                                    loader.stop();
                                }
                            );
                        },
                        function () {
                            loader.stop();
                            cmUtil.scrollToInputError()
                        }
                    )
                };

                /**
                 * Pristine Service Handling
                 */
                $scope.isPristine = true;
                function pristine_callback(){
                    $scope.isPristine = cmPristine.is();
                }
                cmPristine.on('updated',pristine_callback);

                $scope.$on('$destroy', function(){
                    cmPristine.off('updated',pristine_callback);
                })
            }
        }
    }
]);
