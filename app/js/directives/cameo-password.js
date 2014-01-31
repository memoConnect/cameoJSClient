'use strict';
app.directive('cameoPassword', function () {
    return  {
        restrict: 'E',
        templateUrl: 'tpl/directives/cameo-password.html',
        scope: {
            password: '=parentItem'
        },
        controller  :   function($scope, $element, $attrs){
            $scope.showConfirmPWStatus = false;
            $scope.showStrengthMeter = false;
            $scope.passwordType = 'password';
            $scope.showPassword = false;

            $scope.togglePassword = function(){
                if($scope.showPassword){
                    $scope.showPassword = false;
                    $scope.passwordType = 'password';
                } else {
                    $scope.showPassword = true;
                    $scope.passwordType = 'text';
                }
            }

            $scope.checkPWStrength = function(){
                var pw = $scope.pw;

                console.log(pw.length)

                if(pw.length > 3){
                    $scope.showStrengthMeter= true;
                    var bits = passchk_fast.passEntropy(pw);

//                    if(pw.length <= 4){
//                     //very short
//                     } else if(pw.length < 8){
//                     //short
//                     }

//                    if(passchk_fast.passCommon(pw)){
//                        //common pw
//                    }

                    if(bits < 28){
                        $scope.percent = 20;
                        $scope.color = '#d9534f';
                        //very weak
                    } else if(bits < 36){
                        $scope.percent = 40;
                        $scope.color = '#f0ad4e';
                        //weak
                    } else if(bits < 60){
                        $scope.percent = 60;
                        $scope.color = '#f0df43';
                        //reasonable || normal
                    } else if(bits < 128){
                        $scope.percent = 80;
                        $scope.color = '#c4f04e';
                        //strong
                    } else {
                        $scope.percent = 100;
                        $scope.color = '#5cb85c';
                        //very strong
                    }

                    $scope.pwStrength = pw;
                } else {
                    $scope.percent = 0;
                    $scope.color = '#d9534f';
                }
            };

            $scope.confirmPW = function(){
                if($scope.pw == $scope.pwConfirm){
                    $scope.showConfirmPWStatus = true;
                    setPassword($scope.pw);
                }
            };

            /**
             * Wrapper Function to inject Password in extern Controller
             */
            function setPassword(pw){
                if(angular.isDefined(pw)){
                    $scope.password = pw;
                }
            };
        }
    }
});