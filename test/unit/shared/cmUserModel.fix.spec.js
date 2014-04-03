'use strict';

var cmUserModel;

describe('cmUserModel', function(){
    var cmUserModel;

    beforeEach(module("cmUserModel"))

    beforeEach(inject(function(_cmUserModel_) {
        cmUserModel = _cmUserModel_
    }))

    it('should exists', function(){
        expect(cmUserModel).toBeDefined();
    })

    describe('public API', function(){
        it('should defined isAuth',function(){
            expect(cmUserModel.isAuth).toBeDefined();
        })

        it('should defined setIdentiy',function(){
            expect(cmUserModel.setIdentiy).toBeDefined();
        })

        it('should defined isGuest',function(){
            expect(cmUserModel.isGuest).toBeDefined();
        })

        it('should defined doLogin',function(){
            expect(cmUserModel.doLogin).toBeDefined();
        })

        it('should defined doLogout',function(){
            expect(cmUserModel.doLogout).toBeDefined();
        })

        it('should defined storageSave',function(){
            expect(cmUserModel.storageSave).toBeDefined();
        })

        it('should defined storageGet',function(){
            expect(cmUserModel.storageGet).toBeDefined();
        })

        it('should defined storageRemove',function(){
            expect(cmUserModel.storageRemove).toBeDefined();
        })

        it('should defined getToken',function(){
            expect(cmUserModel.getToken).toBeDefined();
        })

        it('should defined storeToken',function(){
            expect(cmUserModel.storeToken).toBeDefined();
        })

        it('should defined removeToken',function(){
            expect(cmUserModel.removeToken).toBeDefined();
        })

        it('should defined saveKey',function(){
            expect(cmUserModel.saveKey).toBeDefined();
        })

        it('should defined loadKeys',function(){
            expect(cmUserModel.loadKeys).toBeDefined();
        })
    })

    /**
     * Mock cmAuth.getToken for testing
     * TODO cmAuth Mock?!?
     */
    xdescribe('Authentication',function(){
        // TODO: couldn't work while cmAuth handling with token = mocken?
        it('should be true, when user is active and has id',function(){
            cmUserModel.data.isActive = true;
            cmUserModel.data.id = 'moep';
            expect(cmUserModel.isAuth()).toBeTruthy();
        })

        it('should be false, when user is active and has no id',function(){
            cmUserModel.data.isActive = true;
            expect(cmUserModel.isAuth()).toBeFalsy();
        })

        it('should be false, when user is inactive and has id',function(){
            cmUserModel.data.id = 'moep';
            expect(cmUserModel.isAuth()).toBeFalsy();
        })
    })

    describe('Encryption and key management', function(){

        //Todo: alot of tests missing

        var good_key = '-----BEGIN RSA PRIVATE KEY-----MGICAQACEHMGknWjWgWOrRHNGMHcekUCAwEAAQIQCxbBG9IppYtgkIxxTnAEwQIJAK6jxsKBxtMtAgkAqJz8dMQfknkCCQCPQ9WzDQmRhQIIGS1n3R+z/zECCQCRAOQtR76HaA==-----END RSA PRIVATE KEY-----',
            bad_key  = '',
            encrypted_secret = 'WjCxJqp8KovZ9UmPNGArNw==' //contains 'priv'

        it('should provide functions "saveKey" and "loadKeys" to store and retrieve rsa keys', function(){
            //@Todo
        })

        it('should provide a function "decryptPassphrase" to decrypt passphrase', function(){
            cmUserModel.publicKeys = cmUserModel.publicKeys|| []
            cmUserModel.publicKeys.push( {privKey : good_key} )
            cmUserModel.publicKeys.push( {privKey : bad_key} )

            expect(cmUserModel.decryptPassphrase).toBeDefined()

            var decrypted_secret = cmUserModel.decryptPassphrase(encrypted_secret)

            expect(decrypted_secret).toBe('priv')

        })

    })

});
