 'use strict';

describe('cmConversationFactory', function(){
    var cmConversationFactory,
        $q, 
        $httpBackend,
        tmpInstance_1 = {id:'moep_1',data:{}},
        tmpInstance_2 = {id:'moep_2',data:{}};

    beforeEach(function(){
        module(function($provide){
            $provide.constant('cmEnv',{});
        })
    })
    beforeEach(module('cmConversations'));
    beforeEach(inject(function(_cmConversationFactory_, _$q_, _$httpBackend_){
        cmConversationFactory   = _cmConversationFactory_
        $q                      = _$q_
        $httpBackend            = _$httpBackend_
    }))

    it('should exist', function(){
        expect(cmConversationFactory).toBeDefined()
    })

    it('should provide a function to retrive a limited set of conversations', function(){
        var result   = []

        for(var i = 0; i< 7; i++){
            result.push({id: 'id'+i})
        }

        $httpBackend.whenGET('/identity').respond({})
        $httpBackend.expectGET('/conversations?limit=5&offset=7').respond(200, {
            res: 'OK',
            data: { numberOfConversations: 7, conversations:result }
        })


        cmConversationFactory.getList(5, 7)

        $httpBackend.flush()
        console.log(cmConversationFactory.length)
    })

})
