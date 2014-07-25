'use strict';

describe('key-model', function() {

    var cmKey

    beforeEach(module('cmCore'))

    beforeEach(inject(function(_cmKey_){
        cmKey = _cmKey_
    }))

    it('should provide "cmKeyFactory"', function(){
        expect(cmKey).toBeDefined()
    })

    it('should have methods', function(){
        var key = new cmKey()
        expect(key.setId).toBeDefined()
        expect(key.setName).toBeDefined()
        expect(key.setKey).toBeDefined()
        expect(key.getPublicKey).toBeDefined()
        expect(key.getFingerprint).toBeDefined()
        expect(key.getPublicKeyForSigning).toBeDefined()
        expect(key.getPrivateKey).toBeDefined()
        expect(key.signKey).toBeDefined()
        expect(key.encrypt).toBeDefined()
        expect(key.decrypt).toBeDefined()
        expect(key.trusts).toBeDefined()
        expect(key.getSize).toBeDefined()
        expect(key.importJSEncrypt).toBeDefined()
        expect(key.exportJSEncrypt).toBeDefined()
        expect(key.importData).toBeDefined()
        expect(key.exportData).toBeDefined()
    })

})
