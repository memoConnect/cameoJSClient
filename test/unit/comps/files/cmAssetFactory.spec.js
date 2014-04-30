'use strict';

describe('cmAssetFactory', function(){
    var cmAssetFactory

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
})