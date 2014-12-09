'use strict';

angular.module('cmValidate')
.directive('cmFormEmail', [
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
            templateUrl: 'comps/validate/form/drtv-form-email.html',
            controller: function($scope) {
                cmVerify.handleInput('email',$scope);
            }
        }
    }
]);