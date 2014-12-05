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
                $scope.icon = '<i class="fa cm-checkbox-wrong"></i>';

                $scope.withVerification = false;

                $scope.$watch('verificationData', function(data){
                    if(data && data.value != '')
                        $scope.withVerification = true;
                    else
                        $scope.withVerification = false;
                });

                $scope.doVerification = function(){
                    if(!$scope.withVerification.isVerified)
                        cmVerify.send('phoneNumber');
                };
            }
        }
    }
]);