//API Wrapper

var cmAPI = angular.module('cmAPI', [])

cmAPI.factory('cmAPI', [

	'$http',
	'$cookiestore',

	function($http){
		return {
			getUrl:		function(path){ 
							return  cameo.restApi+		// base url API
									path+				// path to specific method
									(path.match(/\?/) ? '&token=' : '?token=')+		//add or extend paramters
									$cookieStore.get("token")						//add auth token			TODO cmAuth							
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
