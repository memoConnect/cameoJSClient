'use strict';

describe('cmKeyFactory', function() {

    var cmKeyFactory,
        cmKey,
        $rootScope

    beforeEach(module('cmCore'))

    beforeEach(inject(function(_cmKeyFactory_, _cmKey_, _$rootScope_){
        cmKeyFactory = _cmKeyFactory_
        cmKey = _cmKey_
        $rootScope  = _$rootScope_
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

    describe('bulk encryption', function(){        
        var publicKey_128   = '-----BEGIN PUBLIC KEY-----MCwwDQYJKoZIhvcNAQEBBQADGwAwGAIRALRvUT+teouT0TBjIsbaT8kCAwEAAQ==-----END PUBLIC KEY-----',            
            publicKey_120   = '-----BEGIN PUBLIC KEY-----MCswDQYJKoZIhvcNAQEBBQADGgAwFwIQAKwGNK17gJWTZtwOsKRvmwIDAQAB-----END PUBLIC KEY-----',
            keys

            // identity_data   = {
            //                     id:             'my_test_id',
            //                     publicKeys :    [
            //                                         { id: 'my_first_key',   pubKey : publicKey_128},
            //                                         { id: 'my_second_key',  pubKey : publicKey_120}
            //                                     ]
            //                 },
            // identity        = undefined,
            // dummy           = undefined
            // 
            
            beforeEach(function(cmIdentityModel){
                keys = new cmKeyFactory()

                keys.create({ id: 'my_first_key',   pubKey : publicKey_128})
                keys.create({ id: 'my_second_key',  pubKey : publicKey_120})

            })

            it('should provide a function "encryptPassphrase" to encrypt a passphrase with all availabe public keys', function(){       
                var passphrase  = "x", //test key cannot handle longer passphrases
                    key_list    

                runs(function(){
                    keys.encryptPassphrase(passphrase)
                    .then(function(result){
                        key_list = result
                    })
                    $rootScope.$apply()
                })

                waitsFor(function(){
                    return key_list
                }, "encryption to be done.", 2000)

                runs(function(){
                    expect(key_list.length).toBe(2)
                    expect(key_list[0].encryptedPassphrase).toBeTruthy()
                    expect(key_list[1].encryptedPassphrase).toBeTruthy()
                    //wether the encryption actually worked correctly is tested elsewhere; check cmCrypt
                })

            })

            it('should provide a function "getWeakestKeyLength" to detect the weakest key', function(){
                expect(keys.getWeakestKeySize).toBeDefined()
                expect(keys.getWeakestKeySize()).toBe(120)

                expect(new cmKeyFactory().getWeakestKeySize()).toBe(0)
            })

            console.log('missing test')
            it('should determine transitive trust.', function(){

            })

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
