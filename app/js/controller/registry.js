'use strict';
app.controller('RegistryCtrl', ['$scope','$location','AuthService','cm',
    function($scope,$location, AuthService, cm){
        $scope.formData = {loginName:'',password:'',email:'',phoneNumber:'',name:'',agb:''};

        /**
         * @ ToDo validate formData
         * if phone then form ok?
         * @ ToDo check LoginName
         */
        $scope.regUser = function(){
            var data = {
                loginName: '',
                password: '',
                email: "",
                phoneNumber: '',
                name: ''
            };

            // check cameoName == loginName
            if($scope.registryForm.cameoName.$valid == false){
                cm.notify.warn("Username is required!");
                return false;
            } else {
                data.loginName = $scope.formData.cameoName;
            }

            // check password
            if($scope.formData.password == '' || $scope.formData.password == 'none'){
                cm.notify.warn("Password is required!");
                return false;
            }

            // check email
            if($scope.registryForm.email.$valid == false){
                // http://stackoverflow.com/a/46181/11236
                cm.notify.warn("E-Mail has wrong format!");
                return false;
            } else {
                data.email = $scope.formData.email;
            }

            // check agb
            if($scope.registryForm.agb.$valid == false){
                cm.notify.warn("Confirm AGB!");
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
                    if(check !== true){
                        model.$setValidity('email', false);
                    } else {
                        model.$setValidity('email', true);
                    }
                });
            });
        }
    }
});