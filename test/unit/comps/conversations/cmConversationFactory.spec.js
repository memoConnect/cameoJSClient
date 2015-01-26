 'use strict';

describe('cmConversationFactory', function(){
    var cmConversationFactory,
        $q, 
        $httpBackend,
        $rootScope, 
        $timeout, 
        tmpInstance_1 = {id:'moep_1',data:{}},
        tmpInstance_2 = {id:'moep_2',data:{}};

    beforeEach(function(){
        module('cmConfig')
        module('cmPhonegap')
        module('cmConversations')
        module('cmCore',[
            'cmApiProvider',
            function(cmApiProvider){
                cmApiProvider
                    .setWithoutApiUrl()
            }
        ])
        inject(function(_cmConversationFactory_, _$q_, _$httpBackend_, _$rootScope_, _$timeout_){
            cmConversationFactory   = _cmConversationFactory_
            $q                      = _$q_
            $httpBackend            = _$httpBackend_
            $rootScope              = _$rootScope_
            $timeout                = _$timeout_
        })
    })

    it('should exist', function(){
        expect(cmConversationFactory).toBeDefined()
    })

    it('should have a state.', function(){
        expect(cmConversationFactory.state).toBeDefined()
    })

    it('should provide a function to retrive a limited set of conversations', function(){
        var result   = []

        for(var i = 0; i< 7; i++){
            result.push({})
        }

        $httpBackend.whenGET('/account').respond({})
        $httpBackend.expectGET('/conversations?limit=7&offset=0').respond(200, {
            res: 'OK',
            data: { numberOfConversations: result.length, conversations:result }
        })

        cmConversationFactory.getList(7, 0)

        expect(cmConversationFactory.state.is('loading')).toBe(true)

        $httpBackend.flush()

        //Resolve callbackQueue:
        $timeout.flush(10000)
        $timeout.flush(10000)
        $timeout.flush(10000)
        $timeout.flush(10000)
        $timeout.flush(10000)
        $timeout.flush(10000)
        $timeout.flush(10000)

        expect(cmConversationFactory.state.is('loading')).toBe(false)
        expect(cmConversationFactory.length).toBe(7)

        result = []

        for(var i = 0; i< 5; i++){
            result.push({})
        }

        $httpBackend.expectGET('/conversations?limit=7&offset=5').respond(200, {
            res: 'OK',
            data: { numberOfConversations: result.length, conversations:result }
        })

        cmConversationFactory.getList(7, 5)

        $httpBackend.flush()
        //Resolve callbackQueue:
        $timeout.flush(10000)
        $timeout.flush(10000)
        $timeout.flush(10000)
        $timeout.flush(10000)
        $timeout.flush(10000)


        expect(cmConversationFactory.length).toBe(12)
    })
})
