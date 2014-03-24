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
            $scope.passwordType = 'password';
            $scope.showPassword = false;
            $scope.showPasswordLengthError = false;
            $scope.showPasswordEmptyError = false;

            $scope.$on('cm-empty-password', function(){
                $scope.showPasswordEmptyError = true;
            });

            $scope.checkPasswordLength = function(pw){
                if(pw.length > 0 && pw.length < 6){
                    $scope.showPasswordLengthError = true;
                } else {
                    $scope.showPasswordLengthError = false;
                }
            }

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

                $scope.showPasswordEmptyError = false;

                if(pw != undefined){
                    $scope.checkPasswordLength(pw);

                    $scope.showStrengthMeter= true;
                    var bits = passchk_fast.passEntropy(pw);

//                    console.log(bits);

                    if(bits < 28){
                        $scope.color = '#d9534f';
                        //very weak
                    } else if(bits < 36){
                        $scope.color = '#f0ad4e';
                        //weak
                    } else if(bits < 60){
                        $scope.color = '#f0df43';
                        //reasonable || normal
                    } else if(bits < 128){
                        $scope.color = '#c4f04e';
                        //strong
                    } else {
                        $scope.color = '#5cb85c';
                        //very strong
                    }

                    $scope.percent = 1+(bits>10 ? 100*Math.pow((Math.log(bits-10)/Math.log(bits-3)), 10) : 0) 
                    //100*Math.max(0,(1-Math.pow(1.4,((bits-10)*-0.08)))) 
                    //100*bits / Math.max(128, bits)

//                    $scope.pwStrength = pw;
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
                    $scope.showPasswordEmptyError = false;
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