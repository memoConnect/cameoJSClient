'use strict';

angular.module('cmValidate').directive('cmPassword', [
    'cmCrypt',
    function (cmCrypt) {
        return  {
            restrict: 'E',
            require: 'ngModel',
            templateUrl: 'comps/validate/drtv-password.html',
            scope: {
                password: '=ngModel',
                formName: '@formName',
                tabindex: '@cmTabindex'

            },
            controller: function($scope, $element, $attrs){

                $scope.required = true;
                if(('cmRequired' in $attrs)) {
                    $attrs.$observe('cmRequired', function (isRequired) {
                        $scope.required = isRequired == 'false' ? false : true;
                    });
                }

                $scope.nextTabIndex = parseInt($scope.tabindex) + 1;
                $scope.parentForm = $scope.$parent[$scope.formName];

                function reset(onlyError){

                    if(!onlyError) {
                        $scope.pw = '';
                        $scope.pwConfirm = '';

                        $scope.passwordType = 'password';
                        $scope.showPassword = false;
                    }

                    $scope.error = {
                        empty: false,
                        tooShort: false,
                        confirmEmpty: false,
                        confirmRight: true
                    };
                }

                $scope.togglePassword = function(){
                    if($scope.showPassword){
                        $scope.showPassword = false;
                        $scope.passwordType = 'password';
                    } else {
                        $scope.showPassword = true;
                        $scope.passwordType = 'text';
                    }

                    $scope.confirmPW();
                };

                $scope.validate = function(onlyConfirm){
                    if(!$scope.pw)
                        return false;

                    if(!onlyConfirm)
                        $scope.checkPWStrength('validate');

                    $scope.confirmPW();
                };

                $scope.checkPWStrength = function(whoIs){
                    var pw = $scope.pw;

                    $scope.error.empty = false;
                    $scope.error.tooShort = false;

                    if(pw && pw.length >= 6){
                        $scope.checkPasswordLength(pw);
                        $scope.showStrengthMeter = true;
                        var bits = passchk_fast.passEntropy(pw);

                        if(bits < 28){
                            $scope.bgColor = 'very-weak';
                        } else if(bits < 36){
                            $scope.bgColor = 'week';
                        } else if(bits < 60){
                            $scope.bgColor = 'reasonable-normal';
                        } else if(bits < 128){
                            $scope.bgColor = 'strong';
                        } else {
                            $scope.bgColor = 'very-strong';
                        }

                        $scope.percent = (1+(bits>10 ? 100*Math.pow((Math.log(bits-10)/Math.log(bits-3)), 10) : 0))+'%';
                        //100*Math.max(0,(1-Math.pow(1.4,((bits-10)*-0.08))))
                        //100*bits / Math.max(128, bits)
                    } else {
                        $scope.percent = '0%';
                        $scope.bgColor = 'very-weak';

                        if(pw && pw.length > 0) {
                            $scope.error.tooShort = true;
                            $scope.parentForm.$setValidity('passwordTooShort',false);
                        } else {
                            $scope.error.empty = true;
                            $scope.parentForm.$setValidity('passwordEmpty',false);
                        }
                    }
                };

                $scope.checkPasswordLength = function(pw){
                    if(pw.length > 0 && pw.length < 6){
                        $scope.error.tooShort = true;
                        $scope.parentForm.$setValidity('passwordTooShort',false);
                    } else {
                        $scope.error.tooShort = false;
                        $scope.parentForm.$setValidity('passwordTooShort',true);
                    }
                };

                /**
                 * validates both password inputs
                 */
                $scope.confirmPW = function(){
                    $scope.copyPW();

                    if(!$scope.pw || !$scope.pwConfirm){
                        $scope.error.confirmRight = false;
                        $scope.parentForm.$setValidity('passwordConfirmRight',false);
                        return false;
                    }

                    if(($scope.pw == $scope.pwConfirm)){
                        $scope.error.empty = false;
                        $scope.error.confirmRight = true;
                        $scope.parentForm.$setValidity('passwordConfirmRight',true);
                        setPassword(cmCrypt.hash($scope.pw));
                    } else {
                        $scope.parentForm.$setValidity('passwordConfirmRight',false);
                        $scope.error.confirmRight = false;
                        setPassword('none');
                    }
                };

                $scope.copyPW = function(){
                    if($scope.showPassword)
                        $scope.pwConfirm = $scope.pw;
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

                var killwatcher = $scope.$on('cm-password:empty', function(){
                    $scope.error.empty = true;
                });

                var killwatcher2 = $scope.$on('cm-password:reset', function(){
                    reset();
                });

                reset();

                $scope.$on('$destroy', function(){
                    killwatcher();
                    killwatcher2();
                });
            }
        }
    }
]);