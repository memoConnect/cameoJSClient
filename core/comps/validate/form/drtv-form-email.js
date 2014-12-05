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
                withVerification: '=cmVerify'
            },
            templateUrl: 'comps/validate/form/drtv-form-email.html',
            controller: function($scope){
                $scope.icon = '<i class="fa cm-checkbox-wrong"></i>';

                $scope.doVerification = function(){
                    if(!$scope.withVerification.isVerified)
                        cmVerify.send('email');
                };
            }
        }
    }
]);