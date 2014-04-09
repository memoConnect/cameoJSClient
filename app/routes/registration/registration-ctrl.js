define([
    'app',
    'ngload!cmAuth',
    'ngload!cmUserModel',
    'ngload!cmNotify',
    'ngload!cmLogger',
    'ngload!pckValidate'
], function (app) {
    'use strict';

    app.register.controller('RegistrationCtrl', [
    '$scope',
    '$rootScope',
    '$location',
    '$q',
    'cmAuth',
    'cmUserModel',
    '$timeout',
    function ($scope, $rootScope, $location, $q, cmAuth, cmUserModel, $timeout) {
        var reservationSecrets = {};

        $scope.showError = {
            LoginNameExists: false,
            LoginNameEmpty: false,
            LoginNameInvalid: false
        };

        $scope.formData = {loginName: '', password: '', email: '', phoneNumber: '', name: ''};
        $scope.userNameAlternatives = [];
        $scope.showUserNameAlternatives = false;

        $scope.acceptTerms = function(){
            if(!$scope.formData.agb){
                $scope.formData.agb = true;
            } else {
                $scope.formData.agb = false;
            }
        };

        /**
         * checks if LoginName exists, because Login Name have to be unique
         */
        $scope.invalidLoginName = function(){
            return $scope.registrationForm.loginName.$dirty
                && $scope.registrationForm.loginName.$invalid
                && $scope.registrationForm.loginName.$error.minlength;
        };

        // timeout for verfication
        var verifyTO;

        $scope.verifyLoginName = function(){

            // clear exists timeout
            if(verifyTO)
                $timeout.cancel(verifyTO);

            verifyTO = $timeout(function(){
                $scope.showError.LoginNameExists = false;
                $scope.showError.LoginNameInvalid = false;
                $scope.showError.LoginNameEmpty = false;
                $scope.showUserNameAlternatives = false;

                if(typeof $scope.registrationForm.loginName.$viewValue !== 'undefined'){
                    var lastloginName = $scope.registrationForm.loginName.$viewValue.toString();

                    // if input is'nt empty && is valid && reservation secret is'nt exists
                    if(lastloginName != ''
                        && $scope.invalidLoginName() == false
                        && reservationSecrets[lastloginName] == undefined) {
                        // check loginName
                        cmAuth.checkAccountName($scope.registrationForm.loginName.$viewValue)
                            .then(
                            // valid case
                            function(reservationSecret){
                                $scope.registrationForm.loginName.$valid = true;
                                // save reservation secret
                                reservationSecrets[lastloginName] = reservationSecret;
                            },
                            // invalid or exists
                            function(data){
                                // alternatives case
                                if(typeof data == "string"){
                                    $scope.showError.LoginNameExists = true;

                                    /**
                                     * @TODO
                                     * show alternatives
                                     */
                                    $scope.userNameAlternatives = data;
                                    $scope.showUserNameAlternatives = true;

                                // invalid case
                                } else if(typeof data == "object" && data.data.error == 'invalid login name') {
                                    $scope.showError.LoginNameInvalid = true;
                                }

                                $scope.registrationForm.loginName.$valid = false;
                            }
                        );

                    } else {
                        if(lastloginName.length == 0){
                            $scope.registrationForm.loginName.$pristine = true;
                            $scope.registrationForm.loginName.$dirty = false;
                        } else {
                            $scope.registrationForm.loginName.$dirty = true;
                        }
                    }
                }
            },500);
        };


        $scope.validateForm = function(){
            var deferred = $q.defer();

            var data = {
                loginName: null,
                password: null,
                email: null,
                phoneNumber: null,
                displayName: null,
                reservationSecret: null
            };

            // check cameoName == loginName
            if ($scope.registrationForm.loginName.$valid == false) {
                $scope.showLoginNameEmptyError = true;
            } else {
                data.loginName = $scope.registrationForm.loginName.$viewValue;
            }

            // check password
            if ($scope.formData.password == '' || $scope.formData.password == 'none') {
                $rootScope.$broadcast('cm-empty-password');
            } else {
                data.password = $scope.formData.password;
            }

            // check email
            if ($scope.registrationForm.email.$valid == false) {
            } else {
                if ($scope.registrationForm.email.$viewValue != '') {
                    data.email = $scope.registrationForm.email.$viewValue;
                }
            }

            // check phone
            if ($scope.registrationForm.phone.$valid == false) {
            } else {
                if ($scope.registrationForm.phone.$viewValue != '') {
                    data.phoneNumber = $scope.registrationForm.phone.$viewValue;
                }
            }

            // check name
            if ($scope.registrationForm.displayName.$viewValue != '') {
                data.displayName = $scope.registrationForm.displayName.$viewValue;
            }

            // check agb
            if ($scope.registrationForm.agb.$valid == false) {
                $scope.registrationForm.phone.dirty = true;
                $scope.registrationForm.agb.$invalid = true;
            }

            if (!data.loginName in reservationSecrets) {
                $scope.registrationForm.loginName.focus();
                $scope.checkLoginName();
            } else {
                data.reservationSecret = reservationSecrets[data.loginName];
            }

            if($scope.registrationForm.$valid !== false){
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

            $scope.validateForm().then(
                function(data){
                    cmAuth.createUser(data).then(
                        function (userData) {
                            cmUserModel.doLogin($scope.formData.loginName, $scope.formData.password).then(
                                function(){
                                    cmUserModel.setIdentity(userData.identities[0]);
                                    cmUserModel.comesFromRegistration = true;
                                    $location.path("/talks");
                                }
                            )
                            return true;
                        }
                    );
                }
            );

            return false;
        };
    }]);
});