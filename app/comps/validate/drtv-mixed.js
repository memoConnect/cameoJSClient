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
                                console.log(data)
                                correctValue = mixed[Object.keys(mixed)[0]];
                                ngModel.$setValidity(attrs.name, true);
                                ngModel.$render();
                            },
                            //error
                            function (){
                                ngModel.$setValidity(attrs.name, false);
                            }
                        );
                    } else {
                        ngModel.$setValidity(attrs.name, true);
                        ngModel.$setPristine();
                    }
                });
            }
        }
    }
]);