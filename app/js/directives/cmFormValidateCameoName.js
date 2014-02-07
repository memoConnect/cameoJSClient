app.directive('cmValidateCameoName', ['$http', function ($http) {
    return    {
        restrict: 'E',
        templateUrl: 'tpl/directives/cameo-name.html',
        scope: {
            "reservationSecret": "=parentItem" // json o_O ???
        },


        controller: function ($scope, $element, $attrs) {
//            element.on('blur', function(evt){
//                $scope.$apply(function(){
//                    var val = element.val();
//                    if(val != ""){
//                        $http({
//                            method: 'POST',
//                            url: cameo.restApi+'/account/check',
//                            data: {loginName:val}
//                        }).success(function(r){
//                            if(angular.isDefined(r) && angular.isDefined(r.res) && r.res == 'OK' ){
//                                model.$setValidity('cameoName', true);
//
//                                if(angular.isDefined(r.data) && angular.isDefined(r.data.phoneNumber) && r.data.phoneNumber != ''){
//                                    model.$render();
//                                }
//                            } else {
//                                model.$setValidity('cameoName', false);
//                            }
//                        }).error(function(r){
//                            model.$setValidity('cameoName', false);
//                        });
//                    } else {
//                        model.$setValidity('cameoName', true);
//                        model.$setPristine();
//                    }
//                });
//            });
        }
    }
}]);