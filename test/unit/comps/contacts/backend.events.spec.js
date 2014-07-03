'use strict';

describe('Event chain for Contacts', function(){

    var cmApi,
        cmContactsAdapter,
        cmContactsModel,
        cmUserModel, 
        $rootScope,
        $httpBackend,

        friendRequest_data = {"identityId":"80D8zD6OysTfoZA7Bzso","message":"my test message","created":1404313824779}

    beforeEach(function(){
        module(function($provide){
            $provide.constant('cmEnv',{});
        })
    })

    beforeEach(module('cmContacts'))

    beforeEach(inject(function(_cmApi_, _cmContactsAdapter_,_cmContactsModel_, _cmUserModel_, _$rootScope_, _$httpBackend_){
        cmApi               = _cmApi_
        cmContactsAdapter   = _cmContactsAdapter_
        cmContactsModel     = _cmContactsModel_
        cmUserModel         = _cmUserModel_
        $rootScope          = _$rootScope_
        $httpBackend        = _$httpBackend_
    }))

    describe('backend event friendRequest:new.', function(){

        it('should add a new friend request', function(){
            var adapter_triggered  = 0,
                number_of_requests = cmContactsModel.requests.length


            
            $httpBackend.expectGET('/identity').respond(200, {})


            cmContactsAdapter.on('friendRequest:new', function(){ adapter_triggered++ })

            cmApi.trigger('friendRequest:new', {
                friendRequest   : friendRequest_data,
                to              : cmUserModel.data.identity.id
            })

            cmApi.trigger('friendRequest:new', {
                friendRequest   : friendRequest_data,
                to              : 'non-existing-id-jgfjdsgfjg'
            })

            $rootScope.$apply()

            expect(adapter_triggered).toBe(2)
            expect(cmContactsModel.requests.length).toBe(number_of_requests + 1)
        })
    })

    describe('backend event friendRequest:accepted', function(){

        it('should update a contact corresponding to a friend request.', function(){
            var adapter_triggered  = 0
            
            $httpBackend.expectGET('/identity').respond(200, {})

            // :(
            $httpBackend.expectGET('/contacts').respond(200, {})
            $httpBackend.expectGET('/contact-groups').respond(200, {})
            $httpBackend.expectGET('/friendRequests').respond(200, {})

            cmContactsAdapter.on('friendRequest:accepted', function(){ adapter_triggered++ })

            cmApi.trigger('friendRequest:accepted', {
                to              : cmUserModel.data.identity.id,
                from            : '123'
            })

            cmApi.trigger('friendRequest:accepted', {
                to              : 'non-existing-id-jgfjdsgfjg',
                from            : '123'
            })

            $rootScope.$apply()

            expect(adapter_triggered).toBe(2)
            //expect(cmContactsModel.requests.length).toBe(number_of_requests + 1)
            console.log('test missing!')
        })
    })
})