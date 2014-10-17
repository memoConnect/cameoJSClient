'use strict';

angular.module('cmValidate').directive('cmValidateMixed',[
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
                        cmAuth.checkMixed(newValue).
                            then(
                            //success
                            function (mixed){
                                correctValue = mixed[Object.keys(mixed)[0]];
                                ngModel.$setValidity('mixed', true);
                                ngModel.$setViewValue(correctValue)
                                ngModel.$render();
                            },
                            //error
                            function (){
                                ngModel.$setValidity('mixed', false);
                            }
                        );
                    } else {
                        ngModel.$setValidity('mixed', true);
                        ngModel.$setPristine();
                    }
                });
            }
        }
    }
]);