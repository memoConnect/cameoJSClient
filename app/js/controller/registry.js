'use strict';
app.controller('RegistryCtrl', ['$scope','$location','AuthService','cm',
    function($scope,$location, AuthService, cm){
        $scope.formData = {loginName:'',password:'',email:'',phoneNumber:'',name:''};

        $scope.regUser = function(){
            var data = {
                loginName: $scope.formData.cameoName,
                password: $scope.formData.password,
                email: "",
                phoneNumber: $scope.formData.phone,
                name: $scope.formData.name
            };

            /**
             * @ ToDo validate formData
             * if pw !empty && != none
             * if cameoName != '' && not exists && min length
             * if email then form ok?
             * if phone then form ok?
             *
             */

            // validate cameoName / loginName


            //validate email
            if($scope.formData.email != "" && validateEmail($scope.formData.email)){
                data.email = $scope.formData.email;
            }


            console.log(data)
            cm.log.debug("ende");
            return false;

            AuthService.createUser(data).
            success(function(r){
                cm.log.debug('createUser success')
                if(r.res == "OK"){
                    $location.path("/login");
                } else {
                    // Notifiation to User
                }
            }).
            error(function(r){
                cm.log.debug('createUser Error')
                // Notifiation to User res,error
            });
        };

        function validateEmail(mail){
            if(angular.isUndefined(mail)){
                return false;
            }

            var regex = '^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+.[a-zA-Z][a-zA-Z]+$';
            if(regex.test(mail)){
                return true;
            }

            return false;
        }

    }
]);