'use strict';

//E-mail, Phone etc. verification


var cmVerify = angular.module('cmVerify', [])


cmVerify.controller('ProfileCtrl', [

    '$scope',

    function ($scope) {
        $scope.mail = 'test@cameo.io'
        $scope.phoneNumber = '+491234567890'
    }
]);



cmVerify.controller('ConfirmCtrl', [

    '$scope',
    '$routeParams',

    function ($scope, $routeParams) {        
        $scope.secret = $routeParams.secret
    }
]);



//send a verification request

cmVerify.directive('cmVerify', [

	'$http',
	'$cookieStore',
	'cmNotify',

	function () {
	    return  {
	        restrict    :   'AE',
	        scope       :   true,        

	        controller  :   function($scope, $element, $attrs, $http, $cookieStore, cmNotify) {
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
	        						$http.post(cameo.restApi+'/verify?token='+$cookieStore.get("token"), to_verify)
	        						.then(

	        							function(){        							
	        								$element.addClass('verified')	        								
	        							},

	        							function(){
	        								$element.addClass('rejected')
		        							//cm.log.error('error: unable to verify.')	
		        						}
		        					)

	        						cmNotify.info('verification pending')
	        						$element.addClass('pending')        						
	        					}

	        					$scope.getData()
	        				}
	    }
	}
]);


//send a confirmation

cmVerify.directive('cmConfirm', [

	'$http',

	function () {
	    return  {
	        restrict    :   'AE',
	        scope       :   true,        

	        controller  :   function($scope, $element, $attrs, $http) {
	        					$scope.confirm = function(){
	        						$http.post('/confirm', $attrs.cmConfirm)
	        					}
	        				}
	    }
	}
]);

