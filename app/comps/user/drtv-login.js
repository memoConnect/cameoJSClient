'use strict';

angular.module('cmUser').directive('cmLogin', [
    '$location',
    'cmNotify',
    'cmUserModel',
    'cmCrypt',
    'cmEnv',
    function ($location, cmNotify, cmUserModel, cmCrypt, cmEnv) {
        return  {
            restrict    :   'A',
            templateUrl :   'comps/user/drtv-login.html',
            scope       :   {},

            controller  :   function ($scope, $rootScope) {
                $scope.cmEnv = cmEnv;
                $scope.showSpinner = false;
                $scope.alertState = '';
                $scope.passwordType = 'password';
                $scope.loginData = {
                    'Dumpuser': {
                        user: 'r1Zhpq8e',
                        pass: 'password'
                    },
                    'DumpuserLocal': {
                        user: '2VqTftqh',
                        pass: 'password'
                    },
                    'TestUser': {
                        user: 'trusting_brown',
                        pass: 'password'
                    }
                };

                $scope.formData = {
                    autologin:'none'
                };

                $scope.handlePassword = function(){
                    $scope.passwordType = ($scope.passwordType != 'password')
                        ? 'password'
                        : 'text';
                };

                $scope.changeAutologin = function(){
                    if($scope.formData.autologin != 'none'){
                        $scope.formData.user = $scope.loginData[$scope.formData.autologin].user;
                        $scope.formData.pass = $scope.loginData[$scope.formData.autologin].pass;
                    } else {
                        $scope.formData.user = "";
                        $scope.formData.pass = "";
                    }
                };

                var isIdle = false;

                $scope.doLogin = function(){
                    if(isIdle)
                        return false;

                    isIdle = true;
                    $scope.alertState = '';
                    $scope.startSpinner();

                    cmUserModel.doLogin($scope.formData.user, cmCrypt.hash($scope.formData.pass))
                        .then(
                        function(){
                            isIdle = false;
                            $scope.stopSpinner();

                            $rootScope.$broadcast('cmLogin:success');

                            if(!$location.$$path.match(/\/purl\/.*/)){
                                $location.path("/talks");
                            }
                        },
                        function(error){
                            isIdle = false;
                            $rootScope.$broadcast('cmLogin:error');
                            $scope.stopSpinner();

                            $scope.alertState = error.status;
                        }
                    );

                    return true;
                };

                $scope.startSpinner = function(){
                    $scope.showSpinner = true;
                };

                $scope.stopSpinner = function(){
                    $scope.showSpinner = false;
                };
            }
        }
    }
]);