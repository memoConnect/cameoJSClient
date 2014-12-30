'use strict';

describe('cmIdentityModel', function(){
    var cmIdentityModel;

    function createIdentity(){
        return new cmIdentityModel;
    }

    beforeEach(function(){
        module('cmConfig')
        module('cmCore')
        inject(function(_cmIdentityModel_){
            cmIdentityModel = _cmIdentityModel_
        })
    })

    it('should exists', function(){
        expect(cmIdentityModel).toBeDefined()
    })

    it('should have importData & load methods', function(){
        var obj = createIdentity();
        expect(obj.importData).toBeDefined()
        expect(obj.load).toBeDefined()
    })

    //Todo: more tests :)

})

