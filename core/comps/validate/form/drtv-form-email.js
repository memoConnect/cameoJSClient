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
                toggleInfo: '@cmToggleInfo',
                disabled: '=cmDisable',
                verificationData: '=cmVerify'
            },
            templateUrl: 'comps/validate/form/drtv-form-email.html',
            controller: function($scope) {
                cmVerify.handleInput('email',$scope);

                $scope.showEmailInfo = false;
                $scope.toggleEmailInfo = function(){
                    if(typeof $scope.toggleInfo == 'string'){
                        $scope.showEmailInfo = !$scope.showEmailInfo ? true : false;
                    }
                }
            }
        }
    }
]);