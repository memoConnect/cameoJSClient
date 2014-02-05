//API Wrapper

var cmApiAuth = angular.module('cmApiAuth', [])


//TODO config cameo

cmApiAuth.factory('cmAuth',[

	'$http',

	function(cmAPI){
	    return {
	        requestToken: function(auth){  //formerlry getToken
	            return	$http.get({
	                		url: cameo.restApi+'/token',
	                		headers: {
	                    		'Authorization': 'Basic '+auth
	                		}
	            		})
	        }

	       ,createUser: function(data){
	            return	$http.post({
	               			url: cameo.restApi+'/account',
	               			data: data
	            		})
	        }
	    }
	}

]);

cmApiAuth.factory('cmAPI', [

	'$http',
	'cmAuth',

	function($http){
		return {
			getUrl:		function(path){ 
							return  cameo.restApi+		// base url API
									path+				// path to specific method
									(path.match(/\?/) ? '&token=' : '?token=')+		//add or extend paramters
									cmAuth.getToken()								//add auth token							
						},

			get:		function(path, config){ return $http.get	(getUrl(path), config) },
			post:		function(path, config){ return $http.post	(getUrl(path), config) },
			delete:		function(path, config){ return $http.delete	(getUrl(path), config) },
			head:		function(path, config){ return $http.head	(getUrl(path), config) },
			put:		function(path, config){ return $http.put	(getUrl(path), config) },
			jsonp:		function(path, config){ return $http.jsonp	(getUrl(path), config) },
		}
	}
])

