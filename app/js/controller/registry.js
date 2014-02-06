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
            if($scope.registryForm.cameoName.$valid == false){
                cm.notify.warn("Username is required!");
                return false;
            } else {
                data.loginName = $scope.formData.cameoName;
            }


            //validate email
            if($scope.registryForm.email.$valid == false){
                // http://stackoverflow.com/a/46181/11236

                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                console.log(re.test(email));
                cm.notify.warn("E-Mail has wrong format!");
                return false;
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

app.directive('cmValidateEmail',function(){
    //http://stackoverflow.com/questions/16863389/angular-js-email-validation-with-unicode-characters
    return {
        require: 'ngModel',
        link: function(scope,element,attrs,model){
            element.on('blur', function(evt){
                scope.$apply(function(){
                    var val = element.val();
                    var check = true;
                    if(val != ""){
                        // http://stackoverflow.com/a/46181/11236
                        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        check = re.test(val);
                    }
                    console.log(check);
                    if(check !== true){
                        model.$setValidity('email', false);
                    }
                });
            });
        }
    }
});