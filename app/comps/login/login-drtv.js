define([
    'app',
    'cmAuth',
    'cmLogger',
    'cmNotify',
    'mUser'
], function(app){
    'use strict';

    app.register.directive('cmLogin', [
        'cmAuth',
        'cmLogger',
        'cmNotify',
        '$location',
        '$interval',
        'ModelUser',
        function (cmAuth, cmLogger, cmNotify, $location, $interval, ModelUser) {
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

                    $scope.isIdle = false;
                    var pointSpinnerInterval;
                    $scope.pointSpinner = "";

                    function pointSpinner(){
                        $scope.isIdle = true;
                        pointSpinnerInterval = $interval(function(){
                            $scope.pointSpinner += ".";

                            if($scope.pointSpinner.length == 3){
                                $scope.pointSpinner = "";
                            }
                        },250);
                    }

                    function cancelPointSpinner(){
                        $scope.isIdle = false;
                        $interval.cancel(pointSpinnerInterval)
                    }

                    $scope.doLogin = function(){
                        if($scope.isIdle)
                            return false;

                        pointSpinner();

                        ModelUser.doLogin($scope.formData.user, $scope.formData.pass)
                        .then(
                            function(){
                                cancelPointSpinner();
                                $location.path("/start")
                            },
                            function(state, error){
                                cancelPointSpinner();
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