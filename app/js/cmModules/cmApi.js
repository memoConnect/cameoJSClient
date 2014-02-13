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
				/***
				All api calls require a config object:

				ie.: api.get(config)

				config works almost like in $http(config)

				most important keys are:					
					url:	api path to call i.e. '/account/check', 
							will give an error message if passed something different from a path (like 'http://dev.cameo.io/...')
							in that case your call will most likely fail brutally

					data:	data to send, any plain object

					exp_ko: key you expect in response body if your request was granted(see below)
					exp_ok: key you expect in response body if your request was denied (see below)


				Authentication and error handling is dealt with automatically.


				example:

                cmApi.get({
                    url:     '/pony',
                    exp_ok:  'pony',
                })

                
                ---> response:  {
                                    "res" : 'OK',
                                    "data": {
												"pony" : "my_new_pony"
											}
								}

				.then(
					function(pony){         <--- gets called because response.res == 'OK', pony will equal 'my_pony'
						yay(pony)
					},

					function(alternative, res){	
						alternative												 
						? meh(alternative)
						: error(alternative) //yet error should have already been handled alesewhere
					}
				)


				---> response:  {
                                    "res" : 'OK',
                                    "data": {
												"dog" : "my_new_dog"
											}
								}

				.then(
					function(pony){      
						yay(pony)
					},
					function(alternative,res){	<--- gets called because response is invalid, "pony" was expected, yet "dog" was delivered
												     alternative will be undefined
												     res however holds all the response 
						alternative												 
						? meh(alternative)
						: error(alternative) //yet error should have been handled already elesewhere
					}
				)




				---> response:	{
									"res" : 'KO',
									"data": {
												"alternative" : "kitty"
											}
								}

				.then(
					function(pony){
						yay(pony)
					},
					function(data, res){ <--- gets called because response.res == 'KO', data will be {'alternative': 'kitty'},
					                          because there was no specific key expected for KO.
					                          res however holds all the response
						alternative												 
						? meh(alternative)
						: error(alternative) //yet error should have been handled already elesewhere
					}
				)




				---> response:	{
									"res" : 'XXX',
									"data": {
												"kitty" : "grumpy cat"
											}
								}

				.then(
					function(pony){
						yay(pony)
					},
                    function(alternative,res){ <--- gets called because response is invalid for neither response.res == 'OK' nor response.res == 'KO', 
                                                    alternative will be undefined
                                                    res however holds all the response
						alternative												 
						? meh(alternative)
						: error(alternative) //yet error should have been handled already elesewhere
					}
				)



				*/

				var api 		=	function(method, config){
										var deferred	=	$q.defer(),

											//get authentification token from cmAuth
											token 		= 	$injector.has('cmAuth')
															?	$injector.get('cmAuth').getToken()
															:	undefined											

										//Api calls are restricted to the preconfigured api base path and should start with a '/'																
										if(!config.url.match(/^\//g)) cmLogger.error('Api calls are restricted to '+rest_api+' . You tried:', config)

										//extend or overwrite config
										config			=	config || {}	// make sure config is defined
										config.method	= 	method			// overwrite method
										config.url		= 	rest_api +		// base url API
															config.url 		// path to specific method															
										config.headers	=	angular.extend({}, {'Authorization': token}, config.headers || {})	//add authorization token to the header


										//check if the response matches the api conventions
										function responseValid(response, exp_ok, exp_ko){
											var valid =    response			
															//response must have a res key that equals 'OK' or 'KO':
														&& (response.res == 'OK' || response.res == 'OK')
															//if your request was granted and something was expected in return, it must be present:
														&& (response.res == "OK" && exp_ok ? response.data[exp_ok] !== undefined : true)
															//if your request was denied and something was expected in return, it must be present:
														&& (response.res == "KO" && exp_ko ? response.data[exp_ko] !== undefined : true) 

											if(!valid) cmLogger.error('Api response invalid; '+(exp_ok||exp_ko ? 'expected: ':'') + (exp_ok||'') +', '+(exp_ko||''), response)

											return(valid)
										}
												
										$http(config).then(											

											function(response){	
												//$http call was successfull:
												//reponse includes config and data, we only need the data:
												var response = response.data

												responseValid(response, config.exp_ok, config.exp_ko)
												?	//response valid, check if OK:
													//if a certain key was expected, resolve promise resp. reject the promise with the according values
													//if nothing was expected, just resolve or reject with value of 'data' in the response body if present or all the data
													//reponse should now look similar to this:
													/*
														"res":	"OK",
														"data": {
																	"some_key": 			"some_value",
																	"some expected_key": 	"some_other value"
																}

													*/
													response.res =='OK'													
													? deferred.resolve(	config.exp_ok ? response.data[config.exp_ok] : response.data || response)
													: deferred.reject(	config.exp_ko ? response.data[config.exp_ko] : response.data || response)
												:	//response invalid, call through:													
													deferred.reject(undefined, response)
											},

											function(response){
												//error messages should come trough backend
												deferred.reject(undefined, response)
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
