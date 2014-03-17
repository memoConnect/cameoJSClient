'use strict';

function cmValidateLoginName(){
    return {
        require: 'ngModel',
        link: function(scope,element,attrs,model){
            element.on('blur', function(evt){
                scope.$apply(function(){
                    var val = element.val();
                    var check = true;
                    if(val != ""){
                        // http://stackoverflow.com/a/46181/11236
                        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        check = re.test(val);
                    }
                    if(check !== true){
                        model.$setValidity('email', false);
                    } else {
                        model.$setValidity('email', true);
                    }
                });
            });
        }
    }
}