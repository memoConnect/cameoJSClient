define([

    'app'

], function (app) {
    'use strict';

    app.register.controller('RegistryCtrl', [

        '$scope',
        '$location',
        'cmAuth',
        'cmNotify',

        function ($scope, $location, cmAuth, cmNotify) {
            var reservation_secrets = {};

            $scope.formData = {loginName: '', password: '', email: '', phoneNumber: '', name: ''};
            $scope.userNameAlternatives = [];
            $scope.showUserNameAlternatives = false;

            /**
             * Checks with Promise?!?!
             */
            $scope.checkUserName = function () {
                if ($scope.registryForm.cameoName.$valid) {

                    var last_checked = $scope.registryForm.cameoName.$viewValue.toString()

                    cmAuth.checkAccountName($scope.registryForm.cameoName.$viewValue)
                    .then(

                        function(reservationSecret){
                            $scope.registryForm.cameoName.$valid = true;
                            reservation_secrets[last_checked] = reservationSecret;
                        },

                        function(alternative){
                            cmNotify.info("Error, check Username again!", {ttl: 5000});                        
                            $scope.registryForm.cameoName.$valid = false;
                        }
                    )


                    /*
                        success(function (r) {
                            if (angular.isDefined(r) && angular.isDefined(r.res) && r.res == 'OK') {
                                if (angular.isDefined(r.data) && angular.isDefined(r.data.reservationSecret)) {
                                    reservationSecret = r.data.reservationSecret;
                                    $scope.registryForm.cameoName.$valid = true;
                            } else {
                                cmNotify.info("Error, check Username again!", {ttl: 5000});
                                $scope.registryForm.cameoName.$invalid = true;
                            }
                        } else {
                            cmNotify.info("Error, check Username again!", {ttl: 5000});
                            $scope.registryForm.cameoName.$invalid = true;
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

            $scope.regUser = function () {
                var data = {
                    loginName: null,
                    password: null,
                    email: null,
                    phoneNumber: null,
                    name: null,
                    reservationSecret: null
                };




                // check cameoName == loginName
                if ($scope.registryForm.cameoName.$valid == false) {
                    cmNotify.warn("Username is required!", {ttl: 5000});
                    return false;
                } else {
                    data.loginName = $scope.registryForm.cameoName.$viewValue;
                }

                // check password
                if ($scope.formData.password == '' || $scope.formData.password == 'none') {
                    cmNotify.warn("Password is required!", {ttl: 5000});
                    return false;
                } else {
                    data.password = $scope.formData.password;
                }

                // check email
                if ($scope.registryForm.email.$valid == false) {
                    cmNotify.warn("E-Mail has wrong format!", {ttl: 5000});
                    return false;
                } else {
                    if ($scope.registryForm.email.$viewValue != '') {
                        data.email = $scope.registryForm.email.$viewValue;
                    }
                }

                // check phone
                if ($scope.registryForm.phone.$valid == false) {
                    cmNotify.warn("Phone has wrong format!", {ttl: 5000});
                    return false;
                } else {
                    if ($scope.registryForm.phone.$viewValue != '') {
                        data.phoneNumber = $scope.registryForm.phone.$viewValue;
                    }
                }

                // check name
                if ($scope.registryForm.name.$viewValue != '') {
                    data.name = $scope.registryForm.name.$viewValue;
                }

                // check agb
                if ($scope.registryForm.agb.$valid == false) {
                    cmNotify.warn("REGISTER.INFO.TERMS", {ttl: 5000});
                    return false;
                }

                if (!data.name in reservation_secrets) {
                    $scope.checkUserName();
                    return false;
                } else {
                    data.reservationSecret = reservation_secrets[data.name];
                }


                cmAuth.createUser(data)
                .then(
                    function (data) {                        
                        $location.path("/login");                        
                    }
                )
            };
        }
    ]);
});