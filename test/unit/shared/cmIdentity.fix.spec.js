'use strict';

describe('cmIdentityModel', function(){
    var cmIdentityModel;

    function createIdentity(){
        return new cmIdentityModel;
    }

    beforeEach(module('cmIdentity'))

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
        var publicKey     = "-----BEGIN PUBLIC KEY-----\nMCwwDQYJKoZIhvcNAQEBBQADGwAwGAIRALRvUT+teouT0TBjIsbaT8kCAwEAAQ==\n-----END PUBLIC KEY-----",
            privateKey    = "-----BEGIN RSA PRIVATE KEY-----\nMGICAQACEQC0b1E/rXqLk9EwYyLG2k/JAgMBAAECEG5Bo4VkzYBiECbf9molRj0C\nCQDuAiRcSRLd8wIJAMITCBrddr5TAgkAqF4ZjLMgxqMCCHIECFDwJuCtAgh1H1nq\nsuLGUA==\n-----END RSA PRIVATE KEY-----",
            identity_data = {
                                id:             'my_test_id',
                                publicKeys :    [
                                                    { id: 'my_first_key',   key : publicKey},
                                                    { id: 'my_second_key',  key : publicKey},
                                                    { id: 'my_third_key',   key : publicKey},
                                                ]
                            },
            identity      = undefined
            beforeEach(inject(function(cmIdentityModel){
                identity  = new cmIdentityModel(identity_data)
            }))

            it('should provide a function "encryptPassphrase" to encrypt a passphrase with all availabe public keys', function(){       
                var passphrase  = "my_passphrase",
                    key_list    = identity.encryptPassphrase()

                expect(key_list.length).toBe(3)
                expect(key_list[0].encrypted_passphrase).toBeTruthy()
                expect(key_list[1].encrypted_passphrase).toBeTruthy()
                expect(key_list[2].encrypted_passphrase).toBeTruthy()
                console.log(key_list)
                //wether the encryption actually worked correctly is tested elsewhere; check cmCrypt
            })

            it('should provide a function "getWeakestKeyLength" to detect the weakest key', function(){

            })


    })
})

describe('cmIdentityFactory', function(){
    var cmIdentityFactory, cmIdentityModel;

    beforeEach(module('cmIdentity'))

    beforeEach(inject(function(_cmIdentityFactory_){
        cmIdentityFactory = _cmIdentityFactory_
    }))

    it('should exists', function(){
        expect(cmIdentity).toBeDefined()
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