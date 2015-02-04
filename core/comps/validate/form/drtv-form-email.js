'use strict';

angular.module('cmValidate')
.directive('cmFormEmail', [
    'cmVerify',
    '$rootScope',
    function (cmVerify,
              $rootScope) {
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
                };

                var killWatcher = $rootScope.$on('cmValidate:error', function(event, errorCodes){
                    if(errorCodes.length > 0 && errorCodes.indexOf('EMAIL_INVALID') >= 0) {
                        $scope.cmInnerForm.email.$setValidity('emailInvalid', false);
                    }
                });

                $scope.$watch('ngModel',function(newValue){
                    $scope.cmInnerForm.email.$setValidity('emailInvalid', true);
                });

                $scope.$on('$destroy', function(){
                    killWatcher();
                });
            }
        }
    }
]);