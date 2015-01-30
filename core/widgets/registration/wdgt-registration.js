'use strict';

angular.module('cmWidgets').directive('cmWidgetRegistration', [
    'cmAuth', 'cmUserModel', 'cmUtil', 'cmLogger', 'cmTransferScopeData',
    'cmNotify', 'cmSystemCheck', 'cmLoader', 'cmDevice', 'cmCrypt',
    '$rootScope', '$location', '$q',
    function (cmAuth, cmUserModel, cmUtil, cmLogger, cmTransferScopeData,
              cmNotify, cmSystemCheck, cmLoader, cmDevice, cmCrypt,
              $rootScope, $location, $q) {
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'widgets/registration/wdgt-registration.html',

            controller: function ($scope) {
                cmSystemCheck.run(true);

                var loader = new cmLoader($scope);

                $scope.showLoginInfo = false;

                $scope.formValidation = false;

                $scope.toogleLoginInfo = function(){
                    if($scope.showLoginInfo){
                        $scope.showLoginInfo = false;
                    } else {
                        $scope.showLoginInfo = true;
                    }
                };

                $scope.formData = {
                    cameoId: '',
                    password: ''
                };

                $scope.handleGuest = false;

                /**
                 * Toogle Function for AGB Check
                 */
                $scope.acceptTerms = function () {
                    $scope.formData.agb = !$scope.formData.agb ? true : false;
                };

                /**
                 * validate Registration Form
                 * @returns {*}
                 */
                $scope.validateForm = function () {
                    var deferred = $q.defer(),
                        valid = true,
                        reservationCheck = false;

                    $scope.formValidation = true;

                    var data = {
                        loginName: null,
                        password: null,
                        reservationSecret: null
                    };

                    // check loginName aka cameoId
                    if ($scope.registrationForm.cameoId.$valid == false) {
                        if ($scope.registrationForm.cameoId.$viewValue == undefined
                            || $scope.registrationForm.cameoId.$viewValue.toString() == ''
                        ) {
                            valid = false;
                            $rootScope.$broadcast('cm-login-name:invalid');
                        }
                    } else {
                        data.loginName = $scope.registrationForm.cameoId.$viewValue;
                    }

                    // check password
                    if ($scope.formData.password == ''
                        || $scope.formData.password == 'none'
                        || $scope.formData.password == undefined) {
                        $rootScope.$broadcast('cm-password:empty');
                        valid = false;
                    } else {
                        data.password = $scope.formData.password;
                    }

                    // check agb
                    if ($scope.registrationForm.agb.$valid == false) {
                        $scope.registrationForm.agb.$invalid = true;
                    }

                    // check reservation secret - index for correct login name
                    if (data.loginName != null && cmUtil.objLen($scope.reservationSecrets) > 0) {
                        if (!(data.loginName in $scope.reservationSecrets)) {
                            cmNotify.warn('REGISTRATION.WARN.RESERVATIONSECRET_MISSING');
                            valid = false;
                        } else {
                            data.reservationSecret = $scope.reservationSecrets[data.loginName];
                            reservationCheck = true;
                        }
                    }

                    if ($scope.registrationForm.$valid !== false && reservationCheck == true) {
                        deferred.resolve(data);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                /**
                 * Form Validation and Apicall to create user
                 */
                $scope.createUser = function () {
                    if (loader.isIdle())
                        return false;

                    loader.start();

                    function sendCreateUserRequest(data) {
                        cmAuth.createUser(data).then(
                            function (accountData) {

                                cmUserModel.doLogin($scope.formData.cameoId, $scope.formData.password, accountData).then(
                                    function() {
                                        if(cmDevice.isDesktop('cmWidgetRegistration') || cmDevice.isApp())
                                            $rootScope.goTo("/setup/account");
                                        else
                                            $rootScope.goTo("/start/download");
                                    },
                                    function() {
                                        loader.stop();
                                    }
                                );
                                return true;
                            },
                            function (response) {
                                loader.stop();

                                if (typeof response == 'object' && 'data' in response && typeof response.data == 'object') {
                                    if (typeof response.data.error != 'undefined' && response.data.error == 'invalid reservation secret') {
                                        $rootScope.$broadcast('registration:checkAccountName');
                                    }
                                } else {
                                    cmNotify.warn('REGISTER.WARN.REGISTRATION_FAILED');
                                }
                            }
                        );
                    }

                    $scope.validateForm().then(
                        function (data) {
                            clearTransferScopeData();

                            sendCreateUserRequest(data);
                        },
                        function () {
                            loader.stop();
                            cmUtil.scrollToInputError();
                        }
                    );
                };

                var killWatcher = $rootScope.$on('registration:createUser', function () {
                        $scope.createUser();
                    });

                /**
                 * Guest Handling
                 */
                if (cmUserModel.isGuest() !== false) {
                    $scope.handleGuest = true;
                }

                // transfer data between routeChanges
                var clearTransferScopeData = cmTransferScopeData.create($scope, {
                    id: 'registration',
                    ignoreVar: 'password',
                    scopeVar: 'formData',
                    onSet: function () {
                        this.noneScopeData = $scope.reservationSecrets;
                    },
                    onGet: function (formData, noneScopeData) {
                        if (noneScopeData != null)
                            $scope.reservationSecrets = noneScopeData
                    }
                });

                $scope.$on('$destroy', function(){
                    killWatcher();
                });
            }
        }
    }
]);