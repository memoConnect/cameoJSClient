'use strict';

describe('cmIdentityModel', function(){
    var cmIdentityModel;

    function createIdentity(){
        return new cmIdentityModel;
    }

    beforeEach(function(){
        module(function($provide){
            $provide.constant('cmEnv',{});
        })
    })

    beforeEach(module('cmCore'))

    beforeEach(inject(function(_cmIdentityModel_){
        cmIdentityModel = _cmIdentityModel_
    }));

    it('should exists', function(){
        expect(cmIdentityModel).toBeDefined()
    })

    // init is now private
    xit('should have init function', function(){
        var obj = createIdentity();
        expect(obj.init).toBeDefined()
    })

    it('should have importData & load methods', function(){
        var obj = createIdentity();
        expect(obj.importData).toBeDefined()
        expect(obj.load).toBeDefined()
    })

    describe('Encryption and Key Management', function(){        
        var publicKey_128 = '-----BEGIN PUBLIC KEY-----MCwwDQYJKoZIhvcNAQEBBQADGwAwGAIRALRvUT+teouT0TBjIsbaT8kCAwEAAQ==-----END PUBLIC KEY-----',            
            publicKey_120 = '-----BEGIN PUBLIC KEY-----MCswDQYJKoZIhvcNAQEBBQADGgAwFwIQAKwGNK17gJWTZtwOsKRvmwIDAQAB-----END PUBLIC KEY-----',
            identity_data = {
                                id:             'my_test_id',
                                publicKeys :    [
                                                    { id: 'my_first_key',   pubKey : publicKey_128},
                                                    { id: 'my_second_key',  pubKey : publicKey_120}
                                                ]
                            },
            identity      = undefined,
            dummy         = undefined

            beforeEach(inject(function(cmIdentityModel){
                identity  = new cmIdentityModel(identity_data)
                dummy = new cmIdentityModel()
            }))

            it('should provide a function "encryptPassphrase" to encrypt a passphrase with all availabe public keys', function(){       
                var passphrase  = "x", //test key cannot handle longer passphrases
                    key_list    = identity.encryptPassphrase(passphrase)

                expect(key_list.length).toBe(2)
                expect(key_list[0].encryptedPassphrase).toBeTruthy()
                expect(key_list[1].encryptedPassphrase).toBeTruthy()
                //wether the encryption actually worked correctly is tested elsewhere; check cmCrypt
            })

            it('should provide a function "getWeakestKeyLength" to detect the weakest key', function(){
                expect(identity.getWeakestKeySize).toBeDefined()
                expect(identity.getWeakestKeySize()).toBe(120)

                expect(dummy.getWeakestKeySize()).toBeFalsy()
            })


    })
})

