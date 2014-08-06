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
                    if(newValue != "" && correctValue == undefined || // value is empty
                       correctValue != undefined && newValue != correctValue // value isnt the correct value from BE
                    ){
                        cmAuth.checkPhoneNumber(newValue).
                            then(
                            //success
                            function (phoneNumber){
                                correctValue = phoneNumber;
                                ngModel.$setValidity('phone', true);
                                ngModel.$setViewValue(phoneNumber);
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