'use strict';
app.controller('RegistryCtrl', ['$scope', 'Auth',
    function($scope, Auth){
        $scope.formData = {};
//        $scope.formData.password = cameoPassword.getPassword();

        $scope.regUser = function(){
            console.log($scope.formData)
        };


        $scope.setPassword = function(password){
            console.log(password)
            $scope.pwCheck = password;
        };
    }
]);