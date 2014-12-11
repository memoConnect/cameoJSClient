'use strict';

angular.module('cmSetup')
    .directive('cmSetupIdentity', [
        'cmUserModel', 'cmAuth', 'cmIdentityFactory', 'cmUtil','cmLoader','cmLogger', '$rootScope', '$q',
        function(cmUserModel, cmAuth, cmIdentityFactory, cmUtil, cmLoader, cmLogger, $rootScope, $q){
            return {
                restrict: 'E',
                templateUrl: 'comps/setup/drtv-setup-identity.html',
                controller: function($scope) {
                    var loader = new cmLoader($scope);

                    $rootScope.generateAutomatic = {
                        generate:true,
                        keySize: 2048
                    };

                    $scope.formData = {
                        cameoId: cmUserModel.data.account.loginName || '',
                        email: '',
                        phoneNumber: '',
                        displayName: ''
                    };

                    $scope.validateDisplayName = function () {
                        if ($scope.formData.displayName == undefined
                            || $scope.formData.displayName.length == 0
                        ) {
                            $scope.cmForm.displayName.$pristine = true;
                            $scope.cmForm.displayName.$dirty = false;
                        }
                    };

                    $scope.validateForm = function () {
                        var deferred = $q.defer(),
                            objectChange = {};

                        function checkCameoId() {
                            var value = $scope.formData.cameoId;
                            if (value && value != '') {
                                objectChange.cameoId = value;
                                objectChange.reservationSecret = $scope.reservationSecrets[objectChange.cameoId];
                            }
                        }

                        function checkDisplayName() {
                            var value = $scope.formData.displayName;
                            if (value != undefined
                                && value != '') {
                                objectChange.displayName = value;
                            }
                        }

                        function checkPhoneNumber() {
                            var value = $scope.formData.phoneNumber;
                            if (value != undefined
                                && value != '') {
                                objectChange.phoneNumber = value;
                            }
                        }

                        function checkEmail() {
                            var value = $scope.formData.email;
                            if (value != undefined
                                && value != '') {
                                objectChange.email = value;
                            }
                        }

                        // check loginName aka cameoId
                        if ($scope.cmForm.cameoId.$valid == false) {
                            if ($scope.cmForm.cameoId.$viewValue == undefined
                                || $scope.cmForm.cameoId.$viewValue.toString() == ''
                            ) {
                                $rootScope.$broadcast('cm-login-name:invalid');
                            }
                        }

                        checkCameoId();
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

                    $scope.createIdentity = function () {
                        if (loader.isIdle())
                            return false;

                        loader.start();

                        $scope.validateForm().then(
                            function (objectChange) {

                                cmAuth.initialIdentity(objectChange, cmUserModel.data.account.basicAuth).then(
                                    function (res) {

                                        cmUserModel.initialIdentity(res.identity, res.token.token);
                                        loader.stop();
                                        $rootScope.goTo('/settings/identity/key/create');
                                    },
                                    function () {
                                        loader.stop();
                                    }
                                );
                            },
                            function () {
                                loader.stop();
                            }
                        )
                    };
                }
            }
        }
    ]
);