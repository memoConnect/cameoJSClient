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