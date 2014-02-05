'use strict';
app.directive('cmVerify', function () {
    return  {
        restrict    :   'AE',
        scope       :   true,        

        controller  :   ['$scope', '$element', '$attrs', 'cm', function($scope, $element, $attrs) {
        					var params 		= $attrs.cmVerify.replace(/\s/, '').split(","),
        						to_verify 	= {}

        					params.forEach(function(param){
        						to_verify[$.camelCase('verify-'+param)] = true
        					})

        					$scope.getData = function(){
        						$scope.status = {}
        						$.each(params, function(key, value){
        							$scope.status[$.camelCase(value)] = Math.random(0) > 0.5 ? 'verified' : 'rejected'
        						})
        					}

        					$scope.verify = function(){
        						$.post('/verify', to_verify)
        						.success(function(){        							
        							$element.addClass('verified')
        							//cm.log.debug('verified!')
        						})
        						.error(function(){
        							$element.addClass('rejected')
        							//cm.log.error('error: unable to verify.')	
        						})
        						.always(function(){
        							$element.removeClass('pending')
        						})

        						$element.addClass('pending')        						
        					}

        					$scope.getData()
        				}]
    }
});