'use strict';

angular.module('cmUser')
.directive('cmLogin', [
    'cmNotify', 'cmUserModel', 'cmKeyStorageService', 'cmCrypt',
    'cmConfig', 'cmEnv', 'cmLoader', 'cmKeyboard',
    '$location', '$rootScope',
    function (cmNotify, cmUserModel, cmKeyStorageService, cmCrypt,
              cmConfig, cmEnv, cmLoader, cmKeyboard,
              $location, $rootScope) {
        return  {
            restrict    :   'AE',
            templateUrl :   'comps/user/drtv-login.html',
            scope       :   {},
            controller  :   function ($scope) {
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

                $scope.handlePassword = function(){
                    $scope.passwordType = ($scope.passwordType != 'password')
                        ? 'password'
                        : 'text';

                    cmKeyboard.focusLast();
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

                                if(typeof cmUserModel.data.account.registrationIncomplete != 'undefined' && cmUserModel.data.account.registrationIncomplete == true){
                                    $rootScope.goTo("/setup/account");
                                } else if(!cmUserModel.hasLocalKeys() && skipKeyInfo == false){
                                    $rootScope.goTo("/setup/keyinfo");
                                } else {
                                    $rootScope.goTo("/talks");
                                }
                            }
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