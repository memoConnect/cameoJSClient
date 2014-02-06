app.directive('cmValidatePhone',['$http', function($http){
    //http://stackoverflow.com/questions/16863389/angular-js-email-validation-with-unicode-characters
    return {
        require: 'ngModel',
        link: function(scope,element,attrs,model){
            element.on('blur', function(evt){
                scope.$apply(function(){
                    var val = element.val();
                    if(val != ""){
                        $http({
                            method: 'POST',
                            url: cameo.restApi+'/services/checkPhoneNumber',
                            data: {phoneNumber:val}
                        }).success(function(r){
                            if(angular.isDefined(r) && angular.isDefined(r.res) && r.res == 'OK' ){
                                model.$setValidity('phone', true);

                                if(angular.isDefined(r.data) && angular.isDefined(r.data.phoneNumber) && r.data.phoneNumber != ''){
                                    model.$setViewValue(r.data.phoneNumber);
                                    model.$render();
                                }
                            } else {
                                model.$setValidity('phone', false);
                            }
                        }).error(function(r){
                            model.$setValidity('phone', false);
                        });
                    } else {
                        model.$setValidity('phone', true);
                    }
                });
            });
        }
    }
}]);