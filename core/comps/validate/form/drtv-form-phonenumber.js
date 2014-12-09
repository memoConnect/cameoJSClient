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
                disabled: '=cmDisable',
                verificationData: '=cmVerify'
            },
            templateUrl: 'comps/validate/form/drtv-form-phonenumber.html',
            controller: function($scope){
                cmVerify.handleInput('phoneNumber',$scope);
            }
        }
    }
]);