'use strict';
app.controller('RegistryCtrl', ['$scope', 'Auth',
    function($scope, Auth){
        $scope.formData = {loginName:'',password:'',email:'',phoneNumber:'',name:''};

        $scope.regUser = function(){
            /**
             * @ ToDo validate formData?
             */
            var data = {
                loginName: $scope.formData.cameoName,
                password: $scope.formData.password,
                email: $scope.formData.email,
                phoneNumber: $scope.formData.phone,
                name: $scope.formData.name
            };

            Auth.createUser(data).
            success(function(res){
                console.log(res);
                //$location.path("/login");
            }).
            error(function(){
                console.log('createUser Error');
            });
        };

    }
]);