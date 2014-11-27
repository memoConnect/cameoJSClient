'use strict';

angular.module('cmValidate')
.directive('cmFormPhonenumber', [
    function () {
        return {
            restrict: 'E',
            scope: {
                ngModel: '=ngModel',
                tabIndex: '@cmTabindex',
                label: '@cmLabel',
                info: '@cmInfo',
                disabled: '=cmDisable'
            },
            templateUrl: 'comps/validate/form/drtv-form-phonenumber.html'
        }
    }
]);