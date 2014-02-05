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
	        template	:	'<span><span>{{status}}</span><button ng-click="verify()">{{"VERIFICATION.REQUEST.LABEL"|cmTranslate}}</button></span>',     

	        controller  :   function($scope, $element, $attrs, $http, $cookieStore, cmNotify) {
	        					var item 	= $attrs.cmVerify,
	        						key		= $.camelCase('verification'+item)

	        					$scope.getStatus = function(){
	        						$scope.status = 'unknown'
	        					}
	        					
	        					$scope.verify = function(){	        						
	        						$http.post(cameo.restApi+'/verify?token='+$cookieStore.get("token"), {data: {key: true}})
	        						.then(

	        							function(response){  
	        								cmNotify.info('XX Request sent: '+item)
	        							},

	        							function(){
	        								cmNotify.error('XX Unable to send request: '+item)
		        						}
		        					)	        						
	        					}

	        					$scope.getStatus()
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

