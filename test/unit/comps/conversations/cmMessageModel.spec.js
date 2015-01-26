'use strict';

describe('cmMessageModel', function(){
   
    var cmMessageModel,
        $httpBackend

    beforeEach(function(){
        module(function($provide){
            $provide.constant('cmEnv',{})
        })
    })
    beforeEach(module('cmPhonegap'))
    beforeEach(module('cmConversations'))
    beforeEach(inject(function(_cmMessageModel_, _$httpBackend_){
        cmMessageModel  = _cmMessageModel_
        $httpBackend    = _$httpBackend_
    }))

    afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation()
        $httpBackend.verifyNoOutstandingRequest()
    })


    /** more Tests needed **/
    /**
     * removed test
     */
    xit('should not save when improper.', function(){
        var message = new cmMessageModel({conversation:{any:'moep'}})

        $httpBackend.whenGET('/account').respond(200,{})
        message.save()

        $httpBackend.flush()

        //expect nothing to happen! There must be no further requests.
    })


    //Unit tests are almost impossible to implement, because too many things have to be mocked like keys and usermodel.


})