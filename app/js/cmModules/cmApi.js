define([

    'angularAMD',
    'app'

], function () {
    'use strict';

    //This Module handels api calls

    var cmApi = angular.module('cmApi', ['cmLogger']);

    //TODO config cameo

    //Service to handle all api calls

    cmApi.provider('cmApi',  [

        function($injector){
            var rest_api = "";

            this.restApiUrl = function(url){
                rest_api = url;
                return(this)
            };

            this.$get = [

			'cmLogger',
			'$http',
			'$injector',
			'$q',

			function(cmLogger, $http, $injector, $q){

				//cmApi can only perfom calls that need authentication if cmAuth is present
				var api 		=	function(method, config){
										var deferred	=	$q.defer(),
											token 		= 	$injector.has('cmAuth')
															?	$injector.get('cmAuth').getToken()
															:	undefined,

											token_param = 	token 
															?	(config.url.match(/\?/) ? '&token=' : '?token=') +	//add or extend paramters
																token												//add auth token							
															:	''

										if(!config.url.match(/^\//g)) cmLogger.error('Api calls are restricted to '+rest_api+' . You tried:', config)

										//extend or overwrite config
										config			=	config || {}
										config.method	= 	method
										config.url		= 	rest_api +		// base url API
															config.url +	// path to specific method
															token_param
										config.headers	=	config.headers || {}

										$.extend(config.headers, {'Authorization': token})

										function responseValid(response, exp_ok_key, exp_ko_key){
											var valid =    response
														&& response.res
														&& (response.res == "OK" && exp_ok_key ? response.data[exp_ok_key] !== undefined : true)
														&& (response.res == "KO" && exp_ko_key ? response.data[exp_ko_key] !== undefined : true) 

											if(!valid) cmLogger.error('Api response invalid; expected '+ (exp_ok_key||'') +', '+(exp_ko_key||''), response)

											return(valid)
										}
												
										$http(config).then(											

											function(response){	
												//$http calls success and error function with an object containing config AND data, we only need the data:
												var response = response.data

												responseValid(response, config.exp_ok, config.exp_ko)
												?	//response valid, check if OK:
													response.res =='OK'
													? deferred.resolve(	config.exp_ok ? response.data[config.exp_ok] : response.data || response)
													: deferred.reject(	config.exp_ko ? response.data[config.exp_ko] : response.data || response)
												:	//response invalid, call through:
													deferred.reject(response)
											},

											function(response){
												//error messages should come trough backend
												deferred.reject(response)
											}
										)
															
										return deferred.promise
									}

				api.get				=	function(config){ return api('GET',		config) }
				api.post			=	function(config){ return api('POST',	config) }
				api.delete			=	function(config){ return api('DELETE',	config) }
				api.head			=	function(config){ return api('HEAD', 	config) }
				api.put				=	function(config){ return api('PUT', 	config) }
				api.jsonp			=	function(config){ return api('JSONP',	config) }						
				
				return api
			}
		]
	}
])

});
