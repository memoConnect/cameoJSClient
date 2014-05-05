'use strict';

describe('cmAssetFactory', function(){
    var cmAssetFactory,
        tmpInstance_1 = 'moep_1',
        tmpInstance_2 = 'moep_2';

    beforeEach(module('cmFiles'));

    beforeEach(inject(function(_cmAssetFactory_){
        cmAssetFactory = _cmAssetFactory_
    }))

    it('should exists', function(){
        expect(cmAssetFactory).toBeDefined()
    })

    it('should have create function', function(){
        expect(cmAssetFactory.create).toBeDefined()
    })

    it('should have getQty function', function(){
        expect(cmAssetFactory.getQty).toBeDefined()
    })

    it('there should be one instance after create one', function(){
        cmAssetFactory.create(tmpInstance_1);
        expect(cmAssetFactory.getQty()).toBe(1);
    })

    it('there should be two instances after create two', function(){
        cmAssetFactory.create(tmpInstance_1);
        cmAssetFactory.create(tmpInstance_2);
        expect(cmAssetFactory.getQty()).toBe(2);
    })

    it('there should be two instances after create two and create one of them twice', function(){
        cmAssetFactory.create(tmpInstance_1);
        cmAssetFactory.create(tmpInstance_2);
        expect(cmAssetFactory.getQty()).toBe(2);

        cmAssetFactory.create(tmpInstance_1);
        expect(cmAssetFactory.getQty()).toBe(2);
    })
})