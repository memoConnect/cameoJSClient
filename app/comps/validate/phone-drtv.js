define([
    'app',
    'cmAuth'
], function(app){
    'use strict';

    app.register.directive('cmValidatePhone',[
        'cmAuth',
        function(cmAuth){
            return {
                require: 'ngModel',
                link: function(scope,element,attrs,model){
                    element.on('blur', function(evt){
                        scope.$apply(function(){
                            var val = element.val();
                            if(val != ""){
                                cmAuth.checkPhoneNumber(val).
                                    then(
                                    //success
                                    function (phoneNumber){
                                        model.$setValidity('phone', true);
                                        model.$setViewValue(phoneNumber);
                                        model.$render();
                                    },
                                    //error
                                    function (){
                                        model.$setValidity('phone', false);
                                    }
                                );
                            } else {
                                model.$setValidity('phone', true);
                                model.$setPristine();
                            }
                        });
                    });
                }
            }
        }
    ]);

    return app;
});