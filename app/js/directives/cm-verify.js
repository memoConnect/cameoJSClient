'use strict';
app.directive('cmVerify', function () {
    return  {
        restrict    :   'AE',
        scope       :   false,        

        controller  :   function($scope, $element, $attrs) {
        					var params 		= $attrs.cmVerify.replace(/\s/, '').split(","),
        						to_verify 	= {}

        					params.forEach(function(param){
        						to_verify[$.camelCase('verify-'+param)] = true
        					})

        					$scope.verify = function(){
        						$.post('/verify', to_verify)
        						.success(function(){})

        						$element.addClass('pending')        						
        					}
        				}
    }
});