//This Module handels authorization and all api calls prior to authorization
//requires: 
//	passchk_fast.js



var cmAuth = angular.module('cmAuth', ['$cookieStore', 'cmApi', 'cmCrypt', 'cmLogger'])


//Service to handle all authenticateion matters

cmAuth.provider('cmAuth', function(){
    
    //Config stuff here

    this.$get = [

    	'cmApi',
    	'$cookieStore',

    	function(cmApi, $cookieStore){
    	    return {

    	    	//ask the api for a new authentication token:
    	        requestToken: 		function(auth){
    						            return cmApi.get('/token', { headers: { 'Authorization': 'Basic '+auth } })
    						        },

    			//store the token in a cookie:
    			storeToken:			function(token){
                                        return $cookieStore.put("token", token);
    								},

    			//retrieve thr token from a cookie
    	        getToken:			function(){
    			        				return $cookieStore.get('token');
    			        			},

    	       	createUser: 		function(data){                                    
    		            				return cmApi.post('/account', { data: data })
    		        				},

       			checkAccountName:	function(name){
    								    return cmApi.post('/account/check', { data: { loginName: name } })
        							},

                checkPhoneNumber:   function(number){
                                        return cmApi.post('/services/checkPhoneNumber', { data: { phoneNumber:number } })
                                    }
    		}
    	}
    ]
});



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






cmAuth.directive('cmValidatePhone',[

    'cmAuth',

    function(cmAuth){
        return {
            require: 'ngModel',
            link: function(scope,element,attrs,model){
                element.on('blur', function(evt){
                    scope.$apply(function(){
                        var val = element.val();
                        if(val != ""){
                            cmAuth.checkPhoneNumber(val)
                            .success(function(r){
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
    }
]);





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