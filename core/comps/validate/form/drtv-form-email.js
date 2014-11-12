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
                info: '@cmInfo'
            },
            templateUrl: 'comps/validate/form/drtv-form-email.html'
        }
    }
]);