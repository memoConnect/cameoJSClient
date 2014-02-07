'use strict';
app.controller('RegistryCtrl', ['$scope', '$location', 'AuthService', 'cm',
    function ($scope, $location, AuthService, cm) {
        $scope.formData = {loginName: '', password: '', email: '', phoneNumber: '', name: ''};

        /**
         * @ ToDo validate formData
         * check LoginName -> reservation Secrect
         */
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
                cm.notify.warn("Username is required!");
                return false;
            } else {
                data.loginName = $scope.formData.cameoName;
            }

            // check password
            if ($scope.formData.password == '' || $scope.formData.password == 'none') {
                cm.notify.warn("Password is required!");
                return false;
            } else {
                data.password = $scope.formData.password;
            }

            // check email
            if ($scope.registryForm.email.$valid == false) {
                // http://stackoverflow.com/a/46181/11236
                cm.notify.warn("E-Mail has wrong format!");
                return false;
            } else {
                if ($scope.formData.email != '') {
                    data.email = $scope.formData.email;
                }
            }

            // check name
            if ($scope.formData.name != '') {
                data.name = $scope.formData.name;
            }

            // check agb
            if ($scope.registryForm.agb.$valid == false) {
                cm.notify.warn("Confirm AGB!");
                return false;
            }

            console.log(data)
            cm.log.debug("ende");
            return false;

            AuthService.createUser(data).
                success(function (r) {
                    cm.log.debug('createUser success')
                    if (r.res == "OK") {
                        $location.path("/login");
                    } else {
                        // Notifiation to User
                    }
                }).
                error(function (r) {
                    cm.log.debug('createUser Error')
                    // Notifiation to User res,error
                });
        };
    }
]);