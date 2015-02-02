'use strict';

angular.module('cmValidate').directive('cmValidateEmail',[
    function (){
        //http://stackoverflow.com/questions/16863389/angular-js-email-validation-with-unicode-characters
        return {
            require: 'ngModel',
            scope: {
                model: '=ngModel'
            },
            link: function(scope, element, attrs, ngModel){
                scope.$watch('model',function (newValue) {
                    var check = true;

                    if(newValue && newValue != ''){
                        // http://stackoverflow.com/a/46181/11236
                        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        check = re.test(newValue);
                    }

                    if(check !== true){
                        ngModel.$setValidity('emailInvalid', false);
                    } else {
                        ngModel.$setValidity('emailInvalid', true);
                    }
                });
            }
        }
    }
]);