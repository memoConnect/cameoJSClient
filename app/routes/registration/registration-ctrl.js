define([
    'app',
    'ngload!cmAuth',
    'ngload!cmNotify',
    'ngload!cmLogger',
    'ngload!pckValidate'
], function (app) {
    'use strict';

    app.register.controller('RegistrationCtrl', [
    '$scope',
    '$location',
    'cmAuth',
    'cmNotify',
    'cmLogger',
    function ($scope, $location, cmAuth, cmNotify, cmLogger) {
        /**
         * tab directive defines
         */
        $scope.tabs = [
            {i18n:'BACK',icon:'fa-chevron-left',href:'#/login','default':true},
        ];

        var reservation_secrets = {};

        $scope.formData = {loginName: '', password: '', email: '', phoneNumber: '', name: '',cameoId: ''};
        $scope.userNameAlternatives = [];
        $scope.showUserNameAlternatives = false;

        /**
         * checks if LoginName exists, because Login Name have to be unique
         */
        $scope.checkLoginName = function () {
            if ($scope.registrationForm.loginName.$valid) {

                var last_checked = $scope.registrationForm.loginName.$viewValue.toString();

                cmAuth.checkAccountName($scope.registrationForm.loginName.$viewValue)
                .then(
                    function(reservationSecret){
                        $scope.registrationForm.loginName.$valid = true;
                        reservation_secrets[last_checked] = reservationSecret;

                        $scope.setCameoID(last_checked);
                    },
                    function(alternative){
                        cmNotify.info("Error, check Username again!", {ttl: 5000});
                        $scope.registrationForm.loginName.$valid = false;
                    }
                );


                /*
                    success(function (r) {
                        if (angular.isDefined(r) && angular.isDefined(r.res) && r.res == 'OK') {
                            if (angular.isDefined(r.data) && angular.isDefined(r.data.reservationSecret)) {
                                reservationSecret = r.data.reservationSecret;
                                $scope.registrationForm.cameoName.$valid = true;
                        } else {
                            cmNotify.info("Error, check Username again!", {ttl: 5000});
                            $scope.registrationForm.cameoName.$invalid = true;
                        }
                    } else {
                        cmNotify.info("Error, check Username again!", {ttl: 5000});
                        $scope.registrationForm.cameoName.$invalid = true;
                    }
                }).error(function (r) {
                    cmNotify.info("Username exists, please choose an other one, thx!", {ttl: 5000});
                    if (angular.isDefined(r) && angular.isDefined(r.data)) {
                        if (angular.isDefined(r.data.alternative)) {
                            /**
                             * @TODO
                             * show alternatives
                             */

                            /*
                        }
                    }
                });
                */
            }
        };

        /**
        * checks if LoginName exists, because Login Name have to be unique
         * @TODO add API CALL
        */
        $scope.checkCameoId = function(){
            cmLogger.debug("cameoID", $scope.registrationForm.cameoId.$viewValue.toString());
        };

        /**
         * Update cameoId in Form
         **/
        $scope.setCameoID = function(id){
            if(angular.isDefined(id) && $scope.registrationForm.cameoId.$viewValue.toString() == ''){
                $scope.registrationForm.cameoId.$setViewValue(id);
                $scope.registrationForm.cameoId.$render();
                $scope.checkCameoId();
            }
        };

        /**
         * Form Validation and Apicall to create user
         */
        $scope.createUser = function () {
            var data = {
                loginName: null,
                password: null,
                canmeoId: null,
                email: null,
                phoneNumber: null,
                name: null,
                reservationSecret: null
            };

            // check cameoName == loginName
            if ($scope.registrationForm.loginName.$valid == false) {
                cmNotify.warn('REGISTER.INFO.EMPTY.USERNAME', {ttl: 5000});
                return false;
            } else {
                data.loginName = $scope.registrationForm.loginName.$viewValue;
            }

            // check password
            if ($scope.formData.password == '' || $scope.formData.password == 'none') {
                cmNotify.warn('REGISTER.INFO.EMPTY.PASSWORD', {ttl: 5000});
                return false;
            } else {
                data.password = $scope.formData.password;
            }

            // check cameoId
            if($scope.registrationForm.cameoId.$viewValue != ''){
                data.cameoId = $scope.registrationForm.cameoId.$viewValue;
            }


            // check email
            if ($scope.registrationForm.email.$valid == false) {
                cmNotify.warn('DIRV.VALIDATE_EMAIL.INFO.INVALID', {ttl: 5000});
                return false;
            } else {
                if ($scope.registrationForm.email.$viewValue != '') {
                    data.email = $scope.registrationForm.email.$viewValue;
                }
            }

            // check phone
            if ($scope.registrationForm.phone.$valid == false) {
                cmNotify.warn('DIRV.VALIDATE_PHONE.INFO.INVALID_PHONE_NUMBER', {ttl: 5000});
                return false;
            } else {
                if ($scope.registrationForm.phone.$viewValue != '') {
                    data.phoneNumber = $scope.registrationForm.phone.$viewValue;
                }
            }

            // check name
            if ($scope.registrationForm.name.$viewValue != '') {
                data.name = $scope.registrationForm.name.$viewValue;
            }

            // check agb
            if ($scope.registrationForm.agb.$valid == false) {
                cmNotify.warn('REGISTER.INFO.TERMS', {ttl: 5000});
                return false;
            }

            if (!data.name in reservation_secrets) {
                $scope.checkUserName();
                return false;
            } else {
                data.reservationSecret = reservation_secrets[data.name];
            }

            // everything is fine an let's create the user
            cmAuth.createUser(data)
            .then(
                function () {
                    $location.path("/login");
                }
            );
            return true;
        };
    }]);
});