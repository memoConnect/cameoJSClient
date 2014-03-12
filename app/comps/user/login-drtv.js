'use strict';

function cmLogin($location, cmNotify, cmUserModel) {
    return  {
        restrict    :   'A',
        templateUrl :   'comps/user/login.html',
        scope       :   {},

        controller  :   function ($scope, $rootScope) {
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
                    user: 'fbGBLqym',
                    pass: 'password'
                }
            };

            $scope.formData = {
                autologin:'none'
            };

            $scope.changeAutologin = function(){
                if($scope.formData.autologin != 'none'){
                    $scope.formData.user = $scope.loginData[$scope.formData.autologin].user
                    $scope.formData.pass = $scope.loginData[$scope.formData.autologin].pass
                } else {
                    $scope.formData.user = ""
                    $scope.formData.pass = ""
                }
            };

            var isIdle = false;

            $scope.doLogin = function(){
                if(isIdle)
                    return false;

                isIdle = true;
                $scope.$broadcast('cmPointSpinner:start');

                cmUserModel.doLogin($scope.formData.user, $scope.formData.pass)
                .then(
                    function(){
                        isIdle = false;
                        $scope.$broadcast('cmPointSpinner:cancel');
                        $rootScope.$broadcast('cmLogin:success');
                        $location.path("/start");
                    },
                    function(state, error){
                        isIdle = false;
                        $rootScope.$broadcast('cmLogin:error');
                        $scope.$broadcast('cmPointSpinner:cancel');
                        cmNotify.error('LOGIN.INFO.'+state, {ttl:5000});
                    }
                );

                return true;
            };
        }
    }
}