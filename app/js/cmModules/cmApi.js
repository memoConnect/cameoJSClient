'use strict';

//This Module handels api calls 

var cmApi = angular.module('cmApi', [])


//TODO config cameo

//Service to handle all api calls


cmApi.provider('cmApi',  [

	function($injector){
		var rest_api = ""

		this.restApiUrl = function(url){
			rest_api = url
			return(this)
		}

		this.$get = [

			'$http',
			'$injector',

			function($http, $injector){

				//cmApi can only perfom calls that need authentication if cmAuth is present
				

				var api 	=	function(method, path, config){
									var token 		= 	$injector.has('cmAuth')
														?	$injector.get('cmAuth').getToken()
														:	undefined,

										token_param = 	token 
														?	(path.match(/\?/) ? '&token=' : '?token=') +	//add or extend paramters
															token											//add auth token							
														:	''

									//extend or overwrite config
									config			=	config || {}
									config.method	= 	method
									config.url		= 	rest_api +		// base url API
														path +			// path to specific method
														token_param
									config.headers	=	config.headers || {}

									$.extend(config.headers, {'Authorization': token})
														
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
	}
])

