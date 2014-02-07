'use strict';
app.controller('RegistryCtrl', ['$scope','$location','AuthService','cm',
    function($scope,$location, AuthService, cm){
        $scope.formData = {loginName:'',password:'',email:'',phoneNumber:'',name:''};

        $scope.regUser = function(){
            /**
             * @ ToDo validate formData
             * if pw !empty && != none
             * if cameoName != '' && not exists && min length
             * if email then form ok?
             * if phone then form ok?
             *
             */
            var data = {
                loginName: $scope.formData.cameoName,
                password: $scope.formData.password,
                email: $scope.formData.email,
                phoneNumber: $scope.formData.phone,
                name: $scope.formData.name
            };

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

    }
]);