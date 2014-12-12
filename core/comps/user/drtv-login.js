'use strict';

angular.module('cmUser').directive('cmLogin', [
    'cmNotify', 'cmUserModel', 'cmKeyStorageService', 'cmCrypt',
    'cmConfig', 'cmEnv', 'cmLoader', 'cmSslCertificateChecker',
    '$location',
    function (cmNotify, cmUserModel, cmKeyStorageService, cmCrypt,
              cmConfig, cmEnv, cmLoader, cmSslCertificateChecker,
              $location) {
        return  {
            restrict    :   'AE',
            templateUrl :   'comps/user/drtv-login.html',
            scope       :   {},
            controller  :   function ($scope, $rootScope) {
                $scope.cmEnv = cmEnv;
                var loader = new cmLoader($scope);
                $scope.alertState = '';
                $scope.passwordType = 'password';
                $scope.loginData = cmConfig.autoLoginData;

                $scope.formData = {
                    autologin:'none'
                };

                function checkPasswordLength(pw){
                    if(typeof pw != 'string' || (pw.length > 0 && pw.length < 6)){
                        return false;
                    }

                    return true;
                }

                $scope.checkSSL = function(){
                    cmSslCertificateChecker.control();
                };

                $scope.handlePassword = function(){
                    $scope.passwordType = ($scope.passwordType != 'password')
                        ? 'password'
                        : 'text';
                };

                $scope.checkPasswordLength = function(){
                    if($scope.formData.pass.length > 0 && $scope.formData.pass.length < 6){
                        return true;
                    }

                    return false;
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

                $scope.doLogin = function(){
                    if(loader.isIdle())
                        return false;

                    $scope.alertState = '';
                    loader.start();

                    if(!checkPasswordLength($scope.formData.pass)){
                        loader.stop();
                        $scope.alertState = 'PW';
                        return false;
                    }

                    cmUserModel.doLogin(
                        $scope.formData.user,
                        cmCrypt.hash($scope.formData.pass)
                    )
                    .then(
                        function(){
                            var storageService = new cmKeyStorageService('appSettings'),
                                skipKeyInfo = storageService.get('skipKeyInfo') || false;

                            if(!$location.$$path.match(/\/purl\/.*/)){
                                if(cmUserModel.loadLocalKeys().length == 0 && skipKeyInfo == false){
                                    $rootScope.goto("/start/keyinfo");
                                } else {
                                    $rootScope.goto("/talks");
                                }
                            }
                            $rootScope.$broadcast('cmLogin:success');
                        },
                        function(error){
                            loader.stop();
                            //$rootScope.$broadcast('cmLogin:error'); // not use in app - BS 21.08.2014

                            if(typeof error == 'object' && 'status' in error){
                                if(error.status){
                                    $scope.alertState = error.status;
                                } else {
                                    $scope.alertState = 'X';
                                }
                            } else {
                                $scope.alertState = 'X';
                            }
                        }
                    );

                    return true;
                };
            }
        }
    }
]);