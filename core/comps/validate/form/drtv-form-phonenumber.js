'use strict';

angular.module('cmValidate')
.directive('cmFormPhonenumber', [
    'cmCountryPrefix', 'cmVerify',
    function (cmCountryPrefix, cmVerify) {
        return {
            restrict: 'E',
            scope: {
                ngModel: '=ngModel',
                ngModelOut: '=ngModelOut',
                tabIndex: '@cmTabindex',
                label: '@cmLabel',
                info: '@cmInfo',
                toggleInfo: '@cmToggleInfo',
                disabled: '=cmDisable',
                verificationData: '=cmVerify'
            },
            templateUrl: 'comps/validate/form/drtv-form-phonenumber.html',
            controller: function($scope){
                cmCountryPrefix.handleView($scope);
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