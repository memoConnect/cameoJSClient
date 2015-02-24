'use strict';

angular.module('cmValidate').directive('cmValidatePhone',[
    function (){
        return {
            require: 'ngModel',
            scope: {
                model: '=ngModel'
            },
            link: function(scope, element, attrs, ngModel){

                var identifier = 'phoneNumberInvalid';

                function checkPhoneNumber(newValue){
                    if(newValue && newValue != "" && correctValue == undefined
                    || newValue && newValue != "" && correctValue != undefined && newValue != correctValue
                    ){
                        if(newValue.search(/^[+]*[\s()0-9]*$/) == 0){
                            ngModel.$setValidity(identifier, true);
                        } else {
                            ngModel.$setValidity(identifier, false);
                        }
                    } else {
                        ngModel.$setValidity(identifier, true);
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