'use strict';

describe('cmFileFactory', function(){
    var cmFileFactory,
        tmpInstance_1 = 'moep_1',
        tmpInstance_2 = 'moep_2';

    beforeEach(module('cmCore'));
    beforeEach(inject(function(_cmFileFactory_){
        cmFileFactory = _cmFileFactory_
    }))

    it('should exists', function(){
        expect(cmFileFactory).toBeDefined()
    })

    it('should have methods', function(){
        expect(cmFileFactory.create).toBeDefined()
        expect(cmFileFactory.getQty).toBeDefined()
    })

    it('there should be one instance after create one', function(){
        cmFileFactory.create(tmpInstance_1);
        expect(cmFileFactory.getQty()).toBe(1);
    })

    it('there should be two instances after create two', function(){
        cmFileFactory.create(tmpInstance_1);
        cmFileFactory.create(tmpInstance_2);
        expect(cmFileFactory.getQty()).toBe(2);
    })

    it('there should be two instances after create two and create one of them twice', function(){
        cmFileFactory.create(tmpInstance_1);
        cmFileFactory.create(tmpInstance_2);
        expect(cmFileFactory.getQty()).toBe(2);

        cmFileFactory.create(tmpInstance_1);
        expect(cmFileFactory.getQty()).toBe(2);
    })
})