//This Module handels authorization
//requires: 
//	passchk_fast.js



var cmAuth = angular.module('cmAuth', ['cmCrypt', 'cmLogger'])


//TODO config cameo


//	SERVICES:  -----------------

//Service to handle all authenticateion matters

cmAuth.provider('cmAuth', function(){
    
    var rest_api = ''

    this.setRestApiUrl = function(url){
        rest_api = url
    }

    this.$get = [

    	'$http',
    	'$cookieStore',

    	function($http, $cookieStore){
    	    return {

    	    	//ask the api for a new authentication token:
    	        requestToken: 		function(auth){
    						            return	$http({
    						            			method:		'GET',
    						                		url: 		rest_api+'/token',
    						                		headers:	{ 'Authorization': 'Basic '+auth }
    						            		})
    						        },

    			//store the token in a cookie:
    			storeToken:			function(token){
                                        return  $cookieStore.put("token", token);
    								},

    			//retrieve thr token from a cookie
    	        getToken:			function(){
    			        				return  $cookieStore.get('token');
    			        			},

    	       	createUser: 		function(data){                                    
    		            				return	$http({
                                                    method:     'POST',
    		               							url:        rest_api+'/account',
    		               							data:       data
    		            						})
    		        				},

       			checkAccountName:	function(data){
    								    return	$http({
                                                    method:     'POST',
                                                    url:        rest_api+'/account/check',
                                                    data:       data
    										    })
        							}
    		}
    	}
    ]
});



//Service to handle all api calls

cmAuth.factory('cmApi', [

	'$http',
	'cmAuth',

	function($http, cmAuth){
		var api 	=	function(method, path, config){
							config.method	= 	method
							config.url		= 	cameo.restApi+		// base url API
												path+				// path to specific method
												(path.match(/\?/) ? '&token=' : '?token=')+		//add or extend paramters
												cmAuth.getToken()								//add auth token							
							return $http(config)
						}

		api.get		=	function(path, config){ return api('GET',		path, config) }
		api.post	=	function(path, config){ return api('POST',		path, config) }
		api.delete	=	function(path, config){ return api('DELETE',	path, config) }
		api.head	=	function(path, config){ return api('HEAD', 		path, config) }
		api.put		=	function(path, config){ return api('PUT', 		path, config) }
		api.jsonp	=	function(path, config){ return api('JSONP',		path, config) }						
		
		return api
	}
])




//	DIRECTIVES:  -----------------




/**
 * This directive needs passchk_fast.js
 */

cmAuth.directive('cameoPassword', ['cmCrypt',
    function (cmCrypt) {
        return  {
            restrict: 'E',
            templateUrl: 'tpl/directives/cameo-password.html',
            scope: {
                password: '=parentItem'
            },
            controller: function($scope, $element, $attrs){
                $scope.showConfirmPWStatus = false;
                $scope.showStrengthMeter = false;
                $scope.passwordType = 'password';
                $scope.showPassword = false;

                $scope.togglePassword = function(){
                    if($scope.showPassword){
                        $scope.showPassword = false;
                        $scope.passwordType = 'password';
                    } else {
                        $scope.showPassword = true;
                        $scope.passwordType = 'text';
                    }
                }

                $scope.checkPWStrength = function(){
                    var pw = $scope.pw;

                    if(pw != undefined && pw.length > 3){
                        $scope.showStrengthMeter= true;
                        var bits = passchk_fast.passEntropy(pw);

                        if(bits < 28){
                            $scope.percent = 10;
                            $scope.color = '#d9534f';
                            //very weak
                        } else if(bits < 36){
                            $scope.percent = 25;
                            $scope.color = '#f0ad4e';
                            //weak
                        } else if(bits < 60){
                            $scope.percent = 50;
                            $scope.color = '#f0df43';
                            //reasonable || normal
                        } else if(bits < 128){
                            $scope.percent = 75;
                            $scope.color = '#c4f04e';
                            //strong
                        } else {
                            $scope.percent = 100;
                            $scope.color = '#5cb85c';
                            //very strong
                        }

                        $scope.pwStrength = pw;
                    } else {
                        $scope.percent = 0;
                        $scope.color = '#d9534f';
                    }
                };

                /**
                 * validates both password inputs
                 */
                $scope.confirmPW = function(){
                    if($scope.pw == $scope.pwConfirm){
                        $scope.showConfirmPWStatus = true;
                        setPassword(cmCrypt.hash($scope.pw));
                    } else {
                        $scope.showConfirmPWStatus = false;
                        setPassword('none');
                    }
                };

                /**
                 * Wrapper Function to inject Password in extern Controller
                 * if password (empty || none) it is wrong, else it is right
                 */
                function setPassword(pw){
                    if(angular.isDefined(pw)){
                        $scope.password = pw;
                    }
                };
            }
        }
}]);



cmAuth.directive('cmValidateEmail',function(){
    //http://stackoverflow.com/questions/16863389/angular-js-email-validation-with-unicode-characters
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
});






cmAuth.directive('cmValidatePhone',['cmApi', function($http){
    return {
        require: 'ngModel',
        link: function(scope,element,attrs,model){
            element.on('blur', function(evt){
                scope.$apply(function(){
                    var val = element.val();
                    if(val != ""){
                        cmApi({
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
                        model.$setPristine();
                    }
                });
            });
        }
    }
}]);





cmAuth.directive('cameoLogin', function () {
    return  {
        restrict    :   'E',
        templateUrl :   'tpl/directives/cameo-login.html',
        scope       :   {},
        controller  :   [

        	'$scope', 
        	'$location', 
        	'cmAuth',
        	'cmLogger', 
        	'cmCrypt',

    		function ($scope, $location, cmAuth, cmLogger, cmCrypt) {
		        $scope.placeholder = {
		            user: "Username"
		            ,pass: "Passwort"
		        };
		        $scope.formData = {};
		        $scope.formRes = {};

		        $scope.token = cmAuth.getToken()+" go to start"||"none";

		        $scope.autologin = function(){
		            cmLogger.debug("autologin called")
		            $scope.formData = {
		                user: "Max"
		                ,pass: "max.mustermann"
		            };
		        };

		        $scope.getToken = function(){
		            cmLogger.debug("requestToken called")
		            cmAuth.requestToken(Base64.encode($scope.formData.user + ":" + cmCrypt.hash($scope.formData.pass))).
		                success(function(res){
		                    $scope.formRes = res.data;
		                    cmAuth.storeToken(res.data.token);
		                    $scope.token = res.data.token;
		                    $location.path("/start");
		                }).
		                error(function(res){
		                    $scope.formRes = res;
		                })
		        };
			}]
    }
});