'use strict';

function cmLogin($location, cmNotify, cmUserModel) {
    return  {
        restrict    :   'A',
        templateUrl :   'comps/user/login.html',
        scope       :   {},

        controller  :   function ($scope, $rootScope) {
            $scope.alertState = '';
            $scope.loginData = {
                'Max': {
                    user: 'Max',
                    pass: 'max.mustermann'
                },
                'Dumpuser': {
                    user: 'r1Zhpq8e',
                    pass: 'password'
                },
                'DumpuserLocal': {
                    user: '2VqTftqh',
                    pass: 'password'
                }
            };

            $scope.formData = {
                autologin:'none'
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
                $scope.$broadcast('cmPointSpinner:start');

                cmUserModel.doLogin($scope.formData.user, $scope.formData.pass)
                .then(
                    function(){
                        isIdle = false;
                        $scope.$broadcast('cmPointSpinner:cancel');
                        $rootScope.$broadcast('cmLogin:success');
                        $location.path("/talks");
                    },
                    function(error){
                        isIdle = false;
                        $rootScope.$broadcast('cmLogin:error');
                        $scope.$broadcast('cmPointSpinner:cancel');

                        $scope.alertState = error.status;
                    }
                );

                return true;
            };
        }
    }
}