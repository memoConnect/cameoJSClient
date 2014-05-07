'use strict';

describe('cmMessageFactory', function(){
    var cmMessageFactory,
        tmpInstance_1 = {id:'moep_1',data:{}},
        tmpInstance_2 = {id:'moep_2',data:{}};


    beforeEach(module('cmConversations'));

    beforeEach(inject(function(_cmMessageFactory_){
        cmMessageFactory = _cmMessageFactory_
    }))

    it('should exists', function(){
        expect(cmMessageFactory).toBeDefined()
    })

    it('should have create function', function(){
        expect(cmMessageFactory.create).toBeDefined()
    })

    it('should have getQty function', function(){
        expect(cmMessageFactory.getQty).toBeDefined()
    })

    it('there should be one instance after create one', function(){
        cmMessageFactory.create(tmpInstance_1);
        expect(cmMessageFactory.getQty()).toBe(1);
    })

    it('there should be two instances after create two', function(){
        cmMessageFactory.create(tmpInstance_1);
        cmMessageFactory.create(tmpInstance_2);
        expect(cmMessageFactory.getQty()).toBe(2);
    })

    it('there should be two instances after create two and create one of them twice', function(){
        cmMessageFactory.create(tmpInstance_1);
        cmMessageFactory.create(tmpInstance_2);
        expect(cmMessageFactory.getQty()).toBe(2);

        cmMessageFactory.create(tmpInstance_1);
        expect(cmMessageFactory.getQty()).toBe(2);
    })
})
