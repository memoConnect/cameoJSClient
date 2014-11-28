'use strict';

describe('base config', function(){

    var cmApi, $httpBackend

    beforeEach(module('cmCore',[
        'cmApiProvider',
        function(cmApiProvider){
            cmApiProvider
            .restApiUrl('my_rest_api')
            .callStackPath('/my_stack_path')
            .useCallStack(true)
            .commitSize(50)
            .commitInterval(false)
            .useEvents(true)
            .eventsPath('/events')
            .eventsInterval(false)
        }
    ]))

    beforeEach(inject(function(_cmApi_, _$httpBackend_){
        cmApi = _cmApi_
        $httpBackend = _$httpBackend_
    }))

    afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation()
        $httpBackend.verifyNoOutstandingRequest()
    })

    it('should provide "cmApi" service', function(){
        expect(cmApi).toBeDefined()
    })

    describe('service', function(){

        it('should itself be a universal function for api calls.', function(){
            $httpBackend.expect('GET',		'my_rest_api/test').respond(200, {res:'OK'} )
            $httpBackend.expect('POST',		'my_rest_api/test').respond(200, {res:'OK'} )
            $httpBackend.expect('DELETE',	'my_rest_api/test').respond(200, {res:'OK'} )
            $httpBackend.expect('HEAD',		'my_rest_api/test').respond(200, {res:'OK'} )
            $httpBackend.expect('PUT',		'my_rest_api/test').respond(200, {res:'OK'} )
            $httpBackend.expect('JSONP',	'my_rest_api/test').respond(200, {res:'OK'} )

            var resolved = 0

            cmApi('GET',	{path:'/test'}, true).then(function(){ resolved++ })
            cmApi('POST',	{path:'/test'}, true).then(function(){ resolved++ })
            cmApi('DELETE',	{path:'/test'}, true).then(function(){ resolved++ })
            cmApi('HEAD',	{path:'/test'}, true).then(function(){ resolved++ })
            cmApi('PUT',	{path:'/test'}, true).then(function(){ resolved++ })
            cmApi('JSONP',	{path:'/test'}, true).then(function(){ resolved++ })

            $httpBackend.flush()

            expect(resolved).toEqual(6)
        })

        it('should provide a function for GET requests.', function(){
            $httpBackend.expect('GET', 'my_rest_api/test').respond(200, {res:'OK'} )
            cmApi.get( {path:'/test'}, true )
            $httpBackend.flush()
        })

        it('should provide a function for GET requests.', function(){
            $httpBackend.expect('POST',	'my_rest_api/test').respond(200, {res:'OK'} )
            cmApi.post( {path:'/test'}, true )
            $httpBackend.flush()
        })

        it('should provide a function for DELETE requests.', function(){
            $httpBackend.expect('DELETE', 'my_rest_api/test').respond(200, {res:'OK'} )
            cmApi.delete( {path:'/test'}, true )
            $httpBackend.flush()
        })

        it('should provide a function for HEAD requests.', function(){
            $httpBackend.expect('HEAD',	'my_rest_api/test').respond(200, {res:'OK'} )
            cmApi.head( {path:'/test'}, true )
            $httpBackend.flush()
        })

        it('should provide a function for PUT requests.', function(){
            $httpBackend.expect('PUT', 'my_rest_api/test').respond(200, {res:'OK'} )
            cmApi.put( {path:'/test'}, true )
            $httpBackend.flush()
        })

        it('should provide a function for JSONP requests.', function(){
            $httpBackend.expect('JSONP', 'my_rest_api/test').respond(200, {res:'OK'} )
            cmApi.jsonp( {path:'/test'}, true )
            $httpBackend.flush()
        })

        it('should check the api conventions for case 1', function(){
            var my_pony, my_alternative;

            $httpBackend.expect('GET', 'my_rest_api/test')
            .respond(200,{
                "res" : 'OK',
                "data": {
                    "pony": "my_new_pony"
                }
            })

            cmApi
            .get({
                path: '/test',
                exp_ok:	'pony'
            }, true)
            .then(
                function(pony){
                    my_pony = pony
                },

                function(alternative, res){
                    my_alternative = alternative
                }
            )

            $httpBackend.flush()
            expect(my_pony).toEqual('my_new_pony')
            expect(my_alternative).not.toBeDefined()
        })

        it('should check the api conventions for case 2', function(){
            var my_pony, my_alternative;

            $httpBackend
            .expect('GET', 'my_rest_api/test')
            .respond(200,{
                "res" : 'OK',
                "data": {
                    "dog": "my_new_dog"
                }
            })

            cmApi
            .get({
                path: '/test',
                exp_ok:	'pony'
            }, true)
            .then(
                function(pony){
                    my_pony = pony
                },

                function(alternative, res){
                    my_alternative = alternative
                }
            )

            $httpBackend.flush()
            expect(my_pony).not.toBeDefined()
            expect(my_alternative).not.toBeDefined()
        })

        it('should check the api conventions for case 3', function(){
            var my_pony, my_alternative;

            $httpBackend.expect('GET', 'my_rest_api/test')
            .respond(200, {
                "res" : 'KO',
                "data": {
                    "alternative" : "kitty"
                }
            }, true)


            cmApi
            .get({
                path: '/test',
                exp_ok: 'pony'
            }, true)
            .then(
                function(pony){
                    my_pony = pony
                },
                function(alternative, res){
                    my_alternative = alternative
                }
            )

            $httpBackend.flush()
            expect(my_pony).not.toBeDefined()
            expect(my_alternative).toEqual({"alternative" : "kitty"})
        })

        it('should check the api conventions for case 4', function(){
            var my_pony, my_alternative;

            $httpBackend
            .expect('GET', 'my_rest_api/test')
            .respond(200, {
                "res" : 'XXX',
                "data": {
                    "kitty" : "grumpy cat"
                }
            })

            cmApi
            .get({
                path: '/test',
                exp_ok:	'pony'
            }, true)
            .then(
                function(pony){
                    my_pony = pony
                },
                function(alternative, res){
                    my_alternative = alternative
                }
            )

            $httpBackend.flush()
            expect(my_pony).not.toBeDefined()
            expect(my_alternative).not.toBeDefined()
        })



        it('should provide a callstack functionality.', function(){
            expect(typeof cmApi.stack).toBe('function')
            expect(typeof cmApi.commit).toBe('function')
            expect(cmApi.call_stack).toBeDefined()
        })

        describe('call stack', function(){

            it('should be empty at first.', function(){
                expect(cmApi.call_stack.length).toBe(0)
            })

            it('should commit nothing if no calls are pending.', function(){
                cmApi.commit()
                //expects are located in afterEach
            })

            it('should stack api calls instead of sending them.', function(){
                cmApi.get({
                    path: '/my_path',
                    data: 'my_data'
                })

                cmApi.get({
                    path: '/my_path',
                    data: 'my_data'
                })

                expect(cmApi.call_stack.length).toBe(2)
                //expects are located in afterEach
            })

            it('should commit pending requests with one api call and resolve promises separately.', function(){
                $httpBackend
                .expect('POST', 'my_rest_api/my_stack_path')
                .respond(200, {
                    res:    'OK',
                    data:   {
                        responses: [
                            {
                                status: 200,
                                body: {
                                    res: 'OK',
                                    data: {
                                        'test1':'test1'

                                    }
                                }
                            },
                            {
                                status: 232,
                                body: {
                                    res: 'KO',
                                    data: {
                                        'test2':'test2'
                                    }
                                }
                            }
                        ]
                    }
                })

                var error   = false,
                    success = false
            
                cmApi.get({
                    path: '/my_path',
                    data: 'my_data'
                }).then(
                    function(response){ success = true },
                    null
                )

                cmApi.get({
                    path: '/my_path',
                    data: 'my_other_data'
                }).then(
                    null,                
                    function(response){ error   = true }
                )


                cmApi.commit()

                expect(cmApi.call_stack.length).toBe(0)

                $httpBackend.flush()

                expect(success).toBe(true)
                //expect(error).toBe(true)

                
            })

        })

        describe('events', function(){

            it('should provide a function "subscribeToEventStream" to subscribe to event streams.', function(){
                expect(typeof cmApi.subscribeToEventStream).toBe('function')

                $httpBackend
                .expect('POST', 'my_rest_api/events')
                .respond(200,{
                    res : "OK",
                    data : {
                        "id" : "my_id"
                    }
                })

                cmApi.subscribeToEventStream()

                $httpBackend.flush()

                expect(cmApi.subscriptionId).toBe('my_id')

            })

            it('should provide a function "getEvents" to retrieve events from backend and trigger them.', function(){
                expect(typeof cmApi.getEvents).toBe('function')


                cmApi.subscriptionId = 'my_id'

                $httpBackend
                .expect('GET', 'my_rest_api/events/my_id')
                .respond(200,{
                    res : "OK",
                    data : {
                        "events" : [
                            {
                                "name" : "my_first_event",
                                "data" : "my_first_data"
                            },
                            {
                                "name" : "my_second_event",
                                "data" : "my_second_data"
                            },
                        ]
                    }
                })

                var data_1, data_2, data_3

                cmApi.getEvents(true)

                cmApi.on('my_first_event', function(event, data){
                    data_1 = data
                })
                cmApi.on('my_second_event', function(event, data){
                    data_2 = data
                })
                cmApi.on('my_third_event', function(event, data){
                    data_3 = data
                })

                $httpBackend.flush()

                expect(data_1).toBe('my_first_data')
                expect(data_2).toBe('my_second_data')
                expect(data_3).not.toBeDefined()
            })

            it('should try to get an subscription id, when none is present and getEvents() is called.', function(){
                cmApi.resetSubscriptionId()

                spyOn(cmApi, 'subscribeToEventStream').andCallThrough()

                $httpBackend.expect('POST','my_rest_api/events').respond('200')

                cmApi.getEvents()

                expect(cmApi.subscribeToEventStream).toHaveBeenCalled()

                $httpBackend.flush()
            })

            it('should change the subscription id, when backend returns a "KO" at a getEvent call and return a new id', function(){
                cmApi.subscriptionId = 'my_id'

                $httpBackend
                    .expect('GET', 'my_rest_api/events/my_id')
                    .respond(232,{
                        res : "KO",
                        data : {
                            "subscriptionId": "my_id_new"
                        }
                    })

                cmApi.getEvents(true)

                $httpBackend.flush()

                expect(cmApi.subscriptionId).toBe('my_id_new')
            })

            it('should not change the subscription id, when backend returns a "KO" at a getEvent call and return no id', function(){
                cmApi.subscriptionId = 'my_id'

                $httpBackend
                    .expect('GET', 'my_rest_api/events/my_id')
                    .respond(232,{
                        res : "KO",
                        data : {
                            "subscription": "my_id_new"
                        }
                    })

                cmApi.getEvents(true)

                $httpBackend.flush()

                expect(cmApi.subscriptionId).toBe('my_id')
            })
        })
    })
})


describe('cmApi with short intervals', function(){

    var cmApi, $httpBackend, $interval;

    beforeEach(module('cmCore',[

        'cmApiProvider',

        function(cmApiProvider){
            cmApiProvider
            .restApiUrl('my_rest_api')
            .callStackPath('/my_stack_path')
            .useCallStack(true)
            .commitSize(50)
            .commitInterval(5)
            .useEvents( true )
            .eventsInterval(5)
            .eventsPath('/events')
        }
    ]))

    beforeEach(inject(function(_cmApi_, _$httpBackend_, _$interval_){
        cmApi        = _cmApi_
        $httpBackend = _$httpBackend_
        $interval    = _$interval_

        jasmine.Clock.useMock();
        spyOn(cmApi, 'commit')
        spyOn(cmApi, 'getEvents')
        cmApi.listenToEvents()
    }))

    afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation()
        $httpBackend.verifyNoOutstandingRequest()
        cmApi.stopListeningToEvents()
    })

    it('should commit call stack every 5 milliseconds.', function(){        
        $interval.flush(50)
        expect(cmApi.commit.calls.length).toBe(10)
    })

    it('should get Events every 5 milliseconds.', function(){
        $interval.flush(50)
        expect(cmApi.getEvents.calls.length).toBe(10)
    })

})




describe('cmApi with cmAuth present', function(){
    beforeEach(module('cmCore',[
        'cmApiProvider',
        function(cmApiProvider){
            cmApiProvider
                .setWithoutApiUrl()
        }
    ]))
    beforeEach(module(function ($provide) {
        $provide.value('cmAuth', {
            getToken: function(){ return "my_token"},
            getTwoFactorToken: function(){ return "my_twofactor_token" } } );
    }))

    it('should extend api calls with an authorization token', inject(function(cmApi, $httpBackend){
        $httpBackend.expect('GET', '/test', null, function(headers){ return 'Authorization' in headers }).respond(200, {res:'OK'} )
        cmApi.get( {path:'/test'}, true)
        $httpBackend.flush()
    }))

    it('should extend api calls with a two factor authorization token, if present', inject(function(cmApi, $httpBackend){
        $httpBackend.expect('GET', '/test', null, function(headers){ return 'X-TwoFactorToken' in headers }).respond(200, {res:'OK'} )
        cmApi.get( {path:'/test'}, true)
        $httpBackend.flush()
    }))
})