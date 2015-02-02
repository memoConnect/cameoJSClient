'use strict';

angular.module('cmValidate')
.directive('cmFormPhonenumber', [
    'cmCountryPrefix', 'cmVerify',
    '$rootScope',
    function (cmCountryPrefix, cmVerify,
              $rootScope) {
        return {
            restrict: 'E',
            require: 'ngModel',
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
            link: function(scope, element, attrs, modelCtrl){
                var killWatcher = $rootScope.$on('cmValidate:error', function(event, errorCodes){
                    if(errorCodes.length > 0 && errorCodes.indexOf('PHONENUMBER_INVALID') >= 0) {
                        modelCtrl.$setValidity('invalid', false);
                    }
                });

                scope.$watch('ngModel',function(newValue){
                    modelCtrl.$setValidity('invalid', true);
                });

                scope.$on('$destroy', function(){
                    killWatcher();
                });
            },
            controller: function($scope){
                cmCountryPrefix.handleView($scope);
                cmVerify.handleInput('phoneNumber',$scope);

                $scope.typeof = function(variable){
                    return typeof variable;
                };

                $scope.showPhoneInfo = false;
                $scope.togglePhoneInfo = function(){
                    if(typeof $scope.toggleInfo == 'string'){
                        $scope.showPhoneInfo = !$scope.showPhoneInfo ? true : false;
                    }
                };
            }
        }
    }
]);