define([
    'app',
    'ngload!cmLogger',
    'ngload!cmNotify',
    'ngload!mUser',
    'comps/point-spinner/point-spinner-drtv'
], function(app){
    'use strict';

    app.register.directive('cmLogin', [
        'cmLogger',
        'cmNotify',
        '$location',
        '$interval',
        'ModelUser',
        function ( cmLogger, cmNotify, $location, $interval, ModelUser) {
            return  {
                restrict    :   'A',
                templateUrl :   'comps/login/login.html',
                scope       :   {},
                controller  :   function ($scope, $element, $attrs) {
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

                    $scope.doLogin = function(){
                        if($scope.isIdle)
                            return false;

                        $scope.$broadcast('cmPointSpinner:start');

                        ModelUser.doLogin($scope.formData.user, $scope.formData.pass)
                        .then(
                            function(){
                                $scope.$broadcast('cmPointSpinner:cancel');
                                $location.path("/start");
                            },
                            function(state, error){
                                $scope.$broadcast('cmPointSpinner:cancel');
                                cmNotify.error('LOGIN.INFO.'+state, {ttl:5000});
                            }
                        );

                        return true;
                    };
                }
            }
        }
    ]);
});