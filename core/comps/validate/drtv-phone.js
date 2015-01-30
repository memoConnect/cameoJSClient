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
                            ngModel.$setValidity('phone', true);
                        } else {
                            ngModel.$setValidity('phone', false);
                        }
                    } else {
                        ngModel.$setValidity('phone', true);
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