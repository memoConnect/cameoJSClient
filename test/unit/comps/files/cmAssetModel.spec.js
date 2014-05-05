'use strict';

describe('cmAssetModel', function(){
    var cmAssetModel

    beforeEach(module('cmFiles'));

    beforeEach(inject(function(_cmAssetModel_){
        cmAssetModel = new _cmAssetModel_
    }))

    it('should exists', function(){
        expect(cmAssetModel).toBeDefined();
    })

    describe('public API', function() {
        it('should defined init', function () {
            console.log(cmAssetModel)
            expect(cmAssetModel.init).toBeDefined();
        })
    })
})