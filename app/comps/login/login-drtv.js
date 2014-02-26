define([
    'app',
    'cmAuth',
    'cmLogger',
    'ModelUser'
], function(app){
    'use strict';

    app.register.directive('cmLogin', [
        'cmAuth',
        'cmLogger',
        '$location',
        'ModelUser',
        function (cmAuth, cmLogger, $location, ModelUser) {
            return  {
                restrict    :   'A',
                templateUrl :   'comps/login/login.html',
                scope       :   {},
                controller  :   function ($scope, $element, $attrs) {
                    var loginData = {
                        'Max': {
                            user: 'Max',
                            pass: 'max.mustermann'
                        },
                        'Dumpuser': {
                            user: 'r1Zhpq8e',
                            pass: 'password'
                        }
                    };

                    $scope.formData = {
                        autologin:'none'
                    };

                    $scope.changeAutologin = function(){
                        if($scope.formData.autologin != 'none'){
                            $scope.formData.user = loginData[$scope.formData.autologin].user
                            $scope.formData.pass = loginData[$scope.formData.autologin].pass
                        } else {
                            $scope.formData.user = ""
                            $scope.formData.pass = ""
                        }
                    };

                    $scope.doLogin = function(){
                        ModelUser.doLogin($scope.formData.user, $scope.formData.pass).then(
                            function(){
                                $location.path("/start");
                            }
                            //error handling is done by cmAuth
                        )
                    };
                }
            }
        }
    ]);

    return app;
});