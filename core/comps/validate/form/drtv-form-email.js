'use strict';

angular.module('cmValidate')
.directive('cmFormEmail', [
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
            templateUrl: 'comps/validate/form/drtv-form-email.html'
        }
    }
]);