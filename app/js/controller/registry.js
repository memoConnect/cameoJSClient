'use strict';
app.controller('RegistryCtrl', ['$scope', '$location', '$http', 'AuthService', 'cm',
    function ($scope, $location, $http, AuthService, cm) {
        var reservationSecret = '';
        $scope.formData = {loginName: '', password: '', email: '', phoneNumber: '', name: ''};
        $scope.userNameAlternatives = [];
        $scope.showUserNameAlternatives = false;

        /**
         * Checks with Promise?!?!
         */
        $scope.checkUserName = function(){
            if($scope.registryForm.cameoName.$valid){
                AuthService.checkAccountName({loginName:$scope.registryForm.cameoName.$viewValue}).
                success(function(r){
                    if(angular.isDefined(r) && angular.isDefined(r.res) && r.res == 'OK'){
                        if(angular.isDefined(r.data) && angular.isDefined(r.data.reservationSecret)){
                            reservationSecret = r.data.reservationSecret;
                            $scope.registryForm.cameoName.$valid = true;
                        } else {
                            cm.notify.info("Error, check Username again!",{ttl:5000});
                            $scope.registryForm.cameoName.$invalid = true;
                        }
                    } else {
                        cm.notify.info("Error, check Username again!",{ttl:5000});
                        $scope.registryForm.cameoName.$invalid = true;
                    }
                }).error(function(r){
                    cm.notify.info("Username exists, please choose an other one, thx!",{ttl:5000});
                    if(angular.isDefined(r) && angular.isDefined(r.data)){
                        if(angular.isDefined(r.data.alternative)){
                            /**
                             * @TODO
                             * show alternatives
                             */
                        }
                    }
                });
            }
        }

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
                cm.notify.warn("Username is required!",{ttl:5000});
                return false;
            } else {
                data.loginName = $scope.registryForm.cameoName.$viewValue;
            }

            // check password
            if ($scope.formData.password == '' || $scope.formData.password == 'none') {
                cm.notify.warn("Password is required!",{ttl:5000});
                return false;
            } else {
                data.password = $scope.formData.password;
            }

            // check email
            if ($scope.registryForm.email.$valid == false) {
                cm.notify.warn("E-Mail has wrong format!",{ttl:5000});
                return false;
            } else {
                if ($scope.registryForm.email.$viewValue != '') {
                    data.email = $scope.registryForm.email.$viewValue;
                }
            }

            // check phone
            if ($scope.registryForm.phone.$valid == false) {
                cm.notify.warn("Phone has wrong format!",{ttl:5000});
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
                cm.notify.warn("Confirm AGB!",{ttl:5000});
                return false;
            }

            if(reservationSecret == ''){
                $scope.checkUserName();
                return false;
            } else {
                data.reservationSecret = reservationSecret;
            }

            AuthService.createUser(data).
                success(function (r) {
                    if (r.res == "OK") {
                        $location.path("/login");
                    } else {
                        // Notifiation to User
                        cm.notify.warn("Something went wrong. Pls check your data and try again!!",{ttl:5000});
                    }
                }).
                error(function (r) {
                    // Notifiation to User res,error
                    cm.notify.warn("Something went wrong. Pls check your data and try again!!",{ttl:5000});
                });
        };
    }
]);