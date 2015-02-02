'use strict';

angular.module('cmValidate')
.directive('cmFormEmail', [
    'cmVerify',
    '$rootScope',
    function (cmVerify,
              $rootScope) {
        return {
            restrict: 'E',
            require: 'ngModel',
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
            link: function(scope, element, attrs, modelCtrl){
                var killWatcher = $rootScope.$on('cmValidate:error', function(event, errorCodes){
                    if(errorCodes.length > 0 && errorCodes.indexOf('EMAIL_INVALID') >= 0) {
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
            controller: function($scope) {
                cmVerify.handleInput('email',$scope);

                $scope.showEmailInfo = false;
                $scope.toggleEmailInfo = function(){
                    if(typeof $scope.toggleInfo == 'string'){
                        $scope.showEmailInfo = !$scope.showEmailInfo ? true : false;
                    }
                };
            }
        }
    }
]);