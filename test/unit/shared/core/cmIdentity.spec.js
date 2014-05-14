'use strict';

describe('cmIdentityModel', function(){
    var cmIdentityModel;

    function createIdentity(){
        return new cmIdentityModel;
    }

    beforeEach(module('cmCore'))

    beforeEach(inject(function(_cmIdentityModel_){
        cmIdentityModel = _cmIdentityModel_
    }));

    it('should exists', function(){
        expect(cmIdentityModel).toBeDefined()
    })

    it('should have init function', function(){
        var obj = createIdentity();
        expect(obj.init).toBeDefined()
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

describe('cmIdentityFactory', function(){
    var cmIdentityFactory, cmIdentityModel;

    beforeEach(module('cmCore'))

    beforeEach(inject(function(_cmIdentityFactory_){
        cmIdentityFactory = _cmIdentityFactory_
    }))

    it('should exists', function(){
        expect(cmIdentityFactory).toBeDefined()
    })

    it('should have create function', function(){
        expect(cmIdentityFactory.create).toBeDefined()
    })

    it('should have getQty function', function(){
        expect(cmIdentityFactory.getQty).toBeDefined()
    })


    describe('create Instance(s) of cmIdentityModel', function(){
        var tmpInstanceId_1 = 'moep';
        var tmpInstanceId_2 = {id:'blub'};
        var cmIdentityModelMock;

        it('there should be one instance after create one', function(){
            var instance = cmIdentityFactory.create(tmpInstanceId_1);
            expect(cmIdentityFactory.getQty()).toBe(1);
        })

        it('there should be two instances after create two', function(){
            var instance1 = cmIdentityFactory.create(tmpInstanceId_1);
            var instance2 = cmIdentityFactory.create(tmpInstanceId_2);
            expect(cmIdentityFactory.getQty()).toBe(2);
        })

        /**
         * TODO
         */
//        it('there should be two instances after create two and create one of them twice', function(){
//            var instance1 = cmIdentity.create(tmpInstanceId_1);
//            var instance2 = cmIdentity.create(tmpInstanceId_2);
//            expect(cmIdentity.getQty()).toBe(2);
//
//            var instance3 = cmIdentity.create(tmpInstanceId_1);
//            expect(cmIdentity.getQty()).toBe(2);
//        })
    })
});