'use strict';

function cmPassword(cmCrypt) {
    return  {
        restrict: 'A',
        templateUrl: 'comps/validate/password.html',
        scope: {
            password: '=parentItem'
        },
        controller: function($scope, $element, $attrs){
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
            };

            $scope.checkPWStrength = function(){
                var pw = $scope.pw;

//                if(pw != undefined && pw.length > 3){w
                if(pw != undefined){
                    $scope.showStrengthMeter= true;
                    var bits = passchk_fast.passEntropy(pw);

                    console.log(bits);

                    if(bits < 28){
                        $scope.percent = 10;
//                        $scope.percent = (10 / 100) * Math.floor(bits);
                        $scope.color = '#d9534f';
                        //very weak
                    } else if(bits < 36){
                        $scope.percent = 25;
//                        $scope.percent = 25 + (25 / 100) * Math.floor(bits);
                        $scope.color = '#f0ad4e';
                        //weak
                    } else if(bits < 60){
                        $scope.percent = 50;
//                        $scope.percent = 50 + (50 / 100) * Math.floor(bits);
                        $scope.color = '#f0df43';
                        //reasonable || normal
                    } else if(bits < 128){
                        $scope.percent = 75;
//                        $scope.percent = 75 + (75 / 100) * Math.floor(bits);
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

            /**
             * validates both password inputs
             */
            $scope.confirmPW = function(){
                if($scope.pw == $scope.pwConfirm){
                    $scope.showConfirmPWStatus = true;
                    setPassword(cmCrypt.hash($scope.pw));
                } else {
                    $scope.showConfirmPWStatus = false;
                    setPassword('none');
                }
            };

            /**
             * Wrapper Function to inject Password in extern Controller
             * if password (empty || none) it is wrong, else it is right
             */
            function setPassword(pw){
                if(angular.isDefined(pw)){
                    $scope.password = pw;
                }
            }
        }
    }
}