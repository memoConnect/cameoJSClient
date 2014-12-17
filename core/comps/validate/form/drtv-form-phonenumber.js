'use strict';

angular.module('cmValidate')
.directive('cmFormPhonenumber', [
    'cmVerify',
    function (cmVerify) {
        return {
            restrict: 'E',
            scope: {
                ngModel: '=ngModel',
                tabIndex: '@cmTabindex',
                label: '@cmLabel',
                info: '@cmInfo',
                toggleInfo: '@cmToggleInfo',
                disabled: '=cmDisable',
                verificationData: '=cmVerify'
            },
            templateUrl: 'comps/validate/form/drtv-form-phonenumber.html',
            controller: function($scope){
                cmVerify.handleInput('phoneNumber',$scope);

                $scope.showPhoneInfo = false;
                $scope.togglePhoneInfo = function(){
                    if(typeof $scope.toggleInfo == 'string'){
                        $scope.showPhoneInfo = !$scope.showPhoneInfo ? true : false;
                    }
                }
            }
        }
    }
]);