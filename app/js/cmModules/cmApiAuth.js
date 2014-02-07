//API Wrapper

var cmApiAuth = angular.module('cmApiAuth', [])


//TODO config cameo

cmApiAuth.factory('cmAuth',[

	'$http',
	'$cookieStore',

	function($http, $cookieStore){
	    return {
	        fetchToken: function(auth){  //formerlry getToken
				            return	$http.get({
				                		url: cameo.restApi+'/token',
				                		headers: {
				                    		'Authorization': 'Basic '+auth
				                		}
				            		})
				        },

	        getToken:	function(){
	        				return $cookieStore.get('token')
	        			},

	       	createUser: function(data){
	            return	$http.post({
	               			url: cameo.restApi+'/account',
	               			data: data
	            		})
	        }
	    }
	}

]);

cmApiAuth.factory('cmApi', [

	'$http',
	'cmAuth',

	function($http, cmAuth){
		return {
			getUrl:		function(path){ 
							return  cameo.restApi+		// base url API
									path+				// path to specific method
									(path.match(/\?/) ? '&token=' : '?token=')+		//add or extend paramters
									cmAuth.getToken()								//add auth token							
						},

			get:		function(path, config){ return $http.get	(this.getUrl(path), config) },
			post:		function(path, config){ return $http.post	(this.getUrl(path), config) },
			delete:		function(path, config){ return $http.delete	(this.getUrl(path), config) },
			head:		function(path, config){ return $http.head	(this.getUrl(path), config) },
			put:		function(path, config){ return $http.put	(this.getUrl(path), config) },
			jsonp:		function(path, config){ return $http.jsonp	(this.getUrl(path), config) },
		}
	}
])

