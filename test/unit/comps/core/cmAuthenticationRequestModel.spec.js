'use strict';

describe('cmAuthenticationRequestModel', function() {
    var cmAuthenticationRequestModel;
    var mockData = {
        id: 'wskxK6QoSprH1ambvpe8',
        created: 1406280637301,
        signature: "022724e66002cefc6f59cb6a8fbf8f5add1667df7623bfaf67e49ddeaca10d68032183118e2c89007fd1c66f93ab35cdb67829a939837d754a0898f6fab3bf94993fe765522489dd5cdbfaf66ebee0418c2719f1e4d45228c03d738aec1265005361521c4009196aa6eb8bc4108395f9cd6b60dea4c92d131cb9090359fb82da92064617f651475fff38bc3e526c8eb8e181fbd6a5c78956360f207f359d02b089c149324bd29ebd534f3a2ac4d9ed19aa7cd04dad914d7469ee7880e8fe86323314c2c8e450e0c9b14843a3f59ef9b2b64a566ea8d5eb88bac18e11a4011b3f52b15cd3871ae92d805d4afde83b95da2cf18c7f5b13973fb57fad55bd0f2f61",
        encryptedTransactionSecret: "XQAgqCtu3TaB/+Gd9ynPyjaMM10UGii0xXP8dX3YbeS30HwgjYaPhGLO3z19tO/qHkejEmw2jYDHYHD5pB6lJOEPJQ9pY0JMrva5KBneXAzKyPcbjcAdbZGkwqCzrBKoXq1uuRrt6pE8wAfdshzgQonS0CMPFVT/VE6NVmeoZe6e1yi3ZaZwUejyzw+rpHcnKLbhyCF7fS/sj8L6hlSc4b7NSDpaz567ZradfduHXGiIVqOZWjPcNkPotn/t5GYbnyg84J0GXUVYBn+6WQ7NOlfPb3ENkquVkXpI7aTLtZRtvB9upuYfUzngkPCQLU/quMvZI4AiidKaBui9uX18Kw==",
        fromKeyId: "0CboIaFvURzalSOC7Wz3",
        fromKeyFingerprint: "fromKeyFingerprint",
        toKeyId: "4UEYJBBcC8UCIn8flmGV",
        toKeyFingerprint: "toKeyFingerprint"

    }

    beforeEach(function () {
        module(function ($provide) {
            $provide.constant('cmEnv', {});
        })
    })

    beforeEach(module('cmCore'))

    beforeEach(inject(function(_cmAuthenticationRequestModel_){
        cmAuthenticationRequestModel = _cmAuthenticationRequestModel_
    }))

    beforeEach(inject(function(_cmUserModel_, _cmFactory_){
        cmUserModel = _cmUserModel_
        cmUserModel.data.identity = {}
        cmUserModel.data.identity.keys = {}
        cmUserModel.data.identity.keys.find = function(){}
    }))

    describe('object and methods',function(){
        it('should exists', function(){
           expect(cmAuthenticationRequestModel).toBeDefined()
        })

        it('should have public methods', function(){
            var obj = new cmAuthenticationRequestModel()
            expect(obj.importData).toBeDefined()
            expect(obj.importKeyResponse).toBeDefined()
            expect(obj.setToKey).toBeDefined()
            expect(obj.exportKeyIdsForBulk).toBeDefined()
            expect(obj.verifyForm).toBeDefined()
            expect(obj.verifyIncomingRequest).toBeDefined()
            expect(obj.verifyTransactionSecret).toBeDefined()
            expect(obj.send).toBeDefined()
            expect(obj.sendKeyResponse).toBeDefined()
            expect(obj.sendKeyRequest).toBeDefined()
            expect(obj.sendVerified).toBeDefined()
            expect(obj.finish).toBeDefined()
        })
    })

    describe('object handling', function(){

        it('id should be defined, when no data will be imported', function (){
            var obj = new cmAuthenticationRequestModel();

            expect(obj.id).toBeDefined()
        })

        it('object data should be same like in mockData', function(){
            var obj = new cmAuthenticationRequestModel(mockData);

            expect(obj.id).toBe(mockData.id)
            expect(obj.created).toBe(mockData.created)
            expect(obj.encryptedTransactionSecret).toBe(mockData.encryptedTransactionSecret)
            expect(obj.signature).toBe(mockData.signature)
            expect(obj.fromKeyId).toBe(mockData.fromKeyId)
            expect(obj.fromKeyFingerprint).toBe(mockData.fromKeyFingerprint)
            expect(obj.toKeyId).toBe(mockData.toKeyId)
            expect(obj.toKeyFingerprint).toBe(mockData.toKeyFingerprint)
        })
    })
})