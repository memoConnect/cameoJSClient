'use strict';

describe('key-factory', function() {

    var cmKeyFactory,
        cmKey

    beforeEach(module('cmCore'))

    beforeEach(inject(function(_cmKeyFactory_, _cmKey_){
        cmKeyFactory = _cmKeyFactory_
        cmKey = _cmKey_
    }))

    it('should provide "cmKeyFactory"', function(){
        expect(cmKeyFactory).toBeDefined()
    })

    it('should be a factory / empty array (object)', function(){
        expect(typeof cmKeyFactory()).toBe('object')
    })

    it('should have methods', function(){
        expect(cmKeyFactory().encryptPassphrase).toBeDefined()
        expect(cmKeyFactory().getWeakestKeySize).toBeDefined()
    })

    it('test like a localstorage', function(){
        var keys = cmKeyFactory(),
            storedKeys = [
                {
                    id:'12345',
                    name:'huschibuschi',
                    created: 1337
                }
            ];
        keys.importFromDataArray(storedKeys)

        expect(keys.length).toEqual(1)
        expect(keys[0] instanceof cmKey).toBeTruthy()
        expect(keys[0].name).toBe(storedKeys[0].name)
        expect(keys[0].id).toBe(storedKeys[0].id)
        expect(keys[0].created).toBe(storedKeys[0].created)
    })

    xit('test find functions', function(){
        var keys = cmKeyFactory(),
            storedKeys = [
                {
                    id:'12345',
                    name:'huschibuschi',
                    created: 1337
                },
                {
                    id:'54321',
                    name:'huschibuschi2',
                    created: 1337
                }
            ];

        keys.create(storedKeys[0]);
        keys.create(storedKeys[1]);

        expect(keys.length).toEqual(2)
    })
})
