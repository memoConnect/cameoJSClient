//This Module handels api calls 

var cmApi = angular.module('cmApi', ['cmAuth'])


//TODO config cameo

//Service to handle all api calls


cmApi.provider('cmApi',  function(){
	var rest_api = ""

	this.setRestApiUrl = function(url){
		rest_api = url
	}

	this.$get = [

		'$http',
		'cmAuth',

		function($http, cmAuth){
			var api 	=	function(method, path, config){
								config.method	= 	method
								config.url		= 	rest_api +		// base url API
													path +			// path to specific method
													(path.match(/\?/) ? '&token=' : '?token=') +	//add or extend paramters
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
	]
})

