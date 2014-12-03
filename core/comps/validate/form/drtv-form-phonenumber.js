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
                withVerification: '=cmVerify'
            },
            templateUrl: 'comps/validate/form/drtv-form-phonenumber.html',
            controller: function($scope){
                $scope.icon = '<i class="fa cm-checkbox-wrong"></i>';

                $scope.doVerification = function(){
                    cmVerify.send('sms');
                };
            }
        }
    }
]);