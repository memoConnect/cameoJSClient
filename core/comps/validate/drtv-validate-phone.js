'use strict';

angular.module('cmValidate').directive('cmValidatePhone',[
    function (){
        return {
            require: 'ngModel',
            scope: {
                model: '=ngModel'
            },
            link: function(scope, element, attrs, ngModel){

                function checkPhoneNumber(newValue){
                    if(newValue && newValue != "" && correctValue == undefined
                    || newValue && newValue != "" && correctValue != undefined && newValue != correctValue
                    ){
                        ngModel.$setViewValue(newValue.replace(/ /g,''));

                        if(newValue.search(/^[+]*[ ()0-9]*$/) == 0){
                            ngModel.$setValidity('phoneNumberInvalid', true);
                        } else {
                            ngModel.$setValidity('phoneNumberInvalid', false);
                        }
                    } else {
                        ngModel.$setValidity('phoneNumberInvalid', true);
                        ngModel.$setPristine();
                    }
                }

                var correctValue;
                scope.$watch('model',function (newValue) {
                    checkPhoneNumber(newValue);
                });
            }
        }
    }
]);