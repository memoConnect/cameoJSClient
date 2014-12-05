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
    'cmContactsModel', 'cmLogger', 'cmLoader', 
    '$rootScope', '$q', '$timeout',
    function(cmIdentityFactory, cmUtil, cmNotify, cmUserModel,
             cmContactsModel, cmLogger, cmLoader,
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

                $scope.isPristine = true;
                $rootScope.$on('pristine:false', function () {
                    $scope.isPristine = false;
                });

                function reset(){
                    $scope.formData = {
                        displayName: $scope.contact.identity.displayName,
                        phoneNumber: $scope.contact.identity.phoneNumber.value,
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



                //security aspects for contacts (maybe this would fit into its own directive):
                

                $scope.noKey                        = undefined
                $scope.hasKey                       = undefined
                $scope.hasAuthenticatedKey          = undefined
                

                function refreshScope(){
                    $scope.contact.securityAspects
                    .get()
                    .then(function(){
                        $scope.noKey                = $scope.contact.securityAspects.applies('NO_KEY')
                        $scope.hasKey               = $scope.contact.securityAspects.applies('AT_LEAST_ONE_KEY')
                        $scope.hasAuthenticatedKey  = $scope.contact.securityAspects.applies('AT_LEAST_ONE_AUTHENTICATED_KEY')
                    })
                }


                refreshScope()

                $scope.contact.securityAspects.on('refresh', refreshScope)
               

                $scope.$on('$destroy',function(){
                    $scope.contact.securityAspects.on('refresh', refreshScope)
                })







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
                            value = $scope.formData.phoneNumber;
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
            }
        }
    }
]);
