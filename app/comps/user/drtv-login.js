'use strict';

angular.module('cmUser').directive('cmLogin', [
    'cmNotify',
    'cmUserModel',
    'cmUserKeyStorageService',
    'cmCrypt',
    'cmConfig',
    '$location',
    function (cmNotify, cmUserModel, cmUserKeyStorageService, cmCrypt, cmConfig, $location) {
        return  {
            restrict    :   'A',
            templateUrl :   'comps/user/drtv-login.html',
            scope       :   {},
            controller  :   function ($scope, $rootScope) {
                $scope.cmEnv = cmConfig.env;
                $scope.showSpinner = false;
                $scope.alertState = '';
                $scope.passwordType = 'password';
                $scope.loginData = cmConfig.autologin;

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

                $scope.doLogin = function(){
                    if($scope.spinner('isIdle'))
                        return false;

                    $scope.alertState = '';
                    $scope.spinner('start');

                    cmUserModel.doLogin(
                        $scope.formData.user,
                        cmCrypt.hash($scope.formData.pass)
                    )
                    .then(
                        function(){
                            var storageService = new cmUserKeyStorageService('appSettings'),
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
                            $scope.spinner('stop');
                            $rootScope.$broadcast('cmLogin:error');

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

                $scope.spinner = function(action){
                    if(action == 'isIdle'){
                        return $scope.showSpinner;
                    }

                    $scope.showSpinner = action == 'stop' ? false : true;
                };
            }
        }
    }
]);