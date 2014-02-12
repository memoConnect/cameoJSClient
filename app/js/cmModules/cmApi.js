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
			'$q',

			function($http, $injector, $q){

				//cmApi can only perfom calls that need authentication if cmAuth is present
				

				var api 	=	function(method, path, config){
									var deferred	=	$q.defer(),
										token 		= 	$injector.has('cmAuth')
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
											
									$http(config).then(

										//$http call success and error function with an object containing config AND data, we only need the data:

										function(response){											
											'data' in response
											? deferred.resolve(response.data)
											: deferred.reject(response)
										},

										function(response){
											//error messages should come trough backend, maybe it would still be nice to do something here?
											deferred.reject(response)
										}
									)
														
									return deferred.promise
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

