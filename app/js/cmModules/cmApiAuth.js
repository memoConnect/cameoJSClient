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

