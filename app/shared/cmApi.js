'use strict';

//This Module handels api calls

var cmApi = angular.module('cmApi', ['cmLogger']);

//TODO config cameo

//Service to handle all api calls

cmApi.provider('cmApi',[
    function($injector){
        var rest_api    = "",
            stack_path  = "",
            commit_size = 10,
            call_stack_disabled = true

        this.restApiUrl = function(url){
            rest_api = url;
            return this
        }

        this.stackPath = function(path){
            stack_path = path
        }

        this.commitSize = function(size){
            commit_size = size
        }

        this.enableCallStack = function (){
            call_stack_disabled = false
        }

        this.$get = [

            'cmLogger',
            '$http',
            '$httpBackend',
            '$injector',
            '$q',

            function(cmLogger, $http, $httpBackend, $injector, $q){
                /***
                All api calls require a config object:

                ie.: api.get(config)

                config works almost like in $http(config)

                most important keys are:
                    path:	api path to call i.e. '/account/check',
                            will give an error message if passed something different from a path (like 'http://dev.cameo.io/...')
                            in that case your call will most likely fail brutally

                    data:	data to send, any plain object

                    exp_ko: key you expect in response body if your request was granted(see below)
                    exp_ok: key you expect in response body if your request was denied (see below)


                Authentication and error handling is dealt with automatically.


                example: (!!check tests in cmApi.spec.js!!)

                cmApi.get({
                    path:     '/pony',
                    exp_ok:  'pony',
                })''


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
               
                //check if the sever's response matches the api conventions
                function responseValid(response, exp_ok, exp_ko){
                    var valid =    response
                                    //response must have a res key that equals 'OK' or 'KO':
                                && (response.res == 'OK' || response.res == 'KO')
                                    //if your request was granted and something was expected in return, it must be present:
                                && (response.res == "OK" && exp_ok ? exp_ok in response.data : true)
                                    //if your request was denied and something was expected in return, it must be present:
                                && (response.res == "KO" && exp_ko ? exp_ko in response.data : true)

                    if(!valid) cmLogger.error('Api response invalid; '+(exp_ok||exp_ko ? 'expected: ':'') + (exp_ok||'') +', '+(exp_ko||''), response)

                    return(valid)
                }
               
               function handleSuccess(response, config, deferred){
                    //$http call was successfull:
                    //reponse includes config and data, we only need the data:
                    var response = response.data

                    responseValid(response, config.exp_ok, config.exp_ko)
                    ?   //response valid, check if OK:
                        //if a certain key was expected, resolve promise resp. reject the promise with the according values
                        //if nothing was expected, just resolve or reject with value of 'data' in the response body if present or all the data
                        //reponse should now look similar to this:
                        /*
                            "res":  "OK",
                            "data": {
                                        "some_key":             "some_value",
                                        "some expected_key":    "some_other value"
                                    }

                        */
                        response.res =='OK'
                        ? deferred.resolve( config.exp_ok ? response.data[config.exp_ok] : response.data || response)
                        : deferred.reject(  config.exp_ko ? response.data[config.exp_ko] : response.data || response)
                    :   //response invalid, call through:
                        deferred.reject(undefined, response)
                }
            

               function handleError(response, config, deferred){                                            
        //                    cmLogger.error('Api call failed: \n '+config.method+' '+config.path, response)
        //                    window.location.href='#/server_down' //@ Todo
                            //error messages should come trough backend
                            deferred.reject(response)
               }



                var api = function(method, config){

                    config = config ? config : method

                    var deferred	=	$q.defer(),

                        //get authentification token from cmAuth if present
                        token 		= 	$injector.has('cmAuth')
                                        ?	$injector.get('cmAuth').getToken()
                                        :	undefined,

                        //get twoFactorAuth token from cmAuth if present
                        twoFactorToken	= 	$injector.has('cmAuth')
                                        ?	$injector.get('cmAuth').getTwoFactorToken()
                                        :	undefined


                    //extend or overwrite config
                    config			=	config || {}	// make sure config is defined
                    config.method	= 	method			// overwrite method
                    config.url		= 	config.url ||
                                        (
                                            rest_api +		// base url API
                                            config.path 	// path to specific method
                                        )
                    config.headers	=	angular.extend(token           ? {'Authorization': token} : {}, config.headers || {})	//add authorization token to the header
                    config.headers	=	angular.extend(twoFactorToken  ? {'X-TwoFactorToken': twoFactorToken} : {}, config.headers || {})	//add two factor authorization token to the header


                    $http(config).then(
                        function(response){ handleSuccess(response, config, deferred) },
                        function(response){ handleError(response, config, deferred) }
                    )

                    return deferred.promise
                }

                api.get		= function(config, force){ return force || call_stack_disabled ? api('GET',	   config) : api.stack('GET',    config) }
                api.post	= function(config, force){ return force || call_stack_disabled ? api('POST',   config) : api.stack('POST',   config) }
                api.delete	= function(config, force){ return force || call_stack_disabled ? api('DELETE', config) : api.stack('DELETE', config) }
                api.head	= function(config, force){ return force || call_stack_disabled ? api('HEAD',   config) : api.stack('HEAD',   config) }
                api.put		= function(config, force){ return force || call_stack_disabled ? api('PUT',    config) : api.stack('PUT',    config) }
                api.jsonp	= function(config, force){ return force || call_stack_disabled ? api('JSONP',  config) : api.stack('JSONP',  config) }


                api.call_stack = []

                api.stack = function(method, config){
                    var deferred = $q.defer()

                    api.call_stack.push({
                        deferred : deferred,
                        config   : config
                    })

                    return deferred.promise
                }


                api.commit = function(){

                    console.log(api.call_stack)

                    if(api.call_stack.length == 0) return null        

                    var items_to_commit = []

                    //pick items from callstack to commit:
                    api.call_stack.forEach(function(item, index){
                        if(items_to_commit.length < commit_size){
                            items_to_commit.push(item)
                            delete api.call_stack[index]
                        }
                    })

                    //remove undefined elements from call_stack:
                    var index = api.call_stack.length
                    while(index--){ if(!api.call_stack[index]) api.call_stack.splice(index,1) }


                    var requests = [],
                        deferred = []

                    //prepare requests:
                    items_to_commit.forEach(function(item, index){                        
                        requests.push(item.config)
                        deferred.push(item.deferred)
                    })


                    console.log(requests)


                    //post requests to call stack api:
                    api.post({
                        path: stack_path,
                        data: {
                            requests: requests
                        },
                        exp_ok : 'responses' 
                    }, true).then(function(responses){

                        requests.forEach(function(request, index){
                            var virtual_url     = rest_api + stack_path + request.path,
                                virtual_request = request
                                response        = response[index]
                                deferred        = deferred[index]

                            virtual_request.url = virtual_url

                            //create virtual backend route:
                            $httpBackend.when(request.method, virtual_url, request.data)
                            .respond(response.status, response.data)

                            //resolve promise with virtual backend call:
                            deferred.resolve(api(virtual_request))
                        })
                    })

                }
                return api
            }
        ]
    }
]);