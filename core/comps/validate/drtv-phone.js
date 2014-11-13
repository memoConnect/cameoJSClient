'use strict';

angular.module('cmValidate').directive('cmValidatePhone',[
    'cmAuth',
    function (cmAuth){
        return {
            require: 'ngModel',
            scope: {
                model: '=ngModel'
            },
            link: function(scope, element, attrs, ngModel){
                var correctValue;
                scope.$watch('model',function (newValue) {
                    if(newValue && newValue != "" && correctValue == undefined || // value isnt empty and first-check
                        newValue && newValue != "" && correctValue != undefined && newValue != correctValue // value isnt the correct value from BE
                    ){
                        cmAuth.checkPhoneNumber(newValue).
                            then(
                            //success
                            function (phoneNumber){
                                correctValue = phoneNumber;
                                ngModel.$setValidity('phone', true);
                                ngModel.$setViewValue(phoneNumber);
                                ngModel.$commitViewValue();
                                ngModel.$render();
                            },
                            //error
                            function (){
                                ngModel.$setValidity('phone', false);
                            }
                        );
                    } else {
                        ngModel.$setValidity('phone', true);
                        ngModel.$setPristine();
                    }
                });
            }
        }
    }
]);