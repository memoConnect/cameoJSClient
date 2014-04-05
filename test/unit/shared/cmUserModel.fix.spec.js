'use strict';

var cmUserModel,
    cmCrypt

describe('cmUserModel', function(){
    var cmUserModel;
        cmCrypt;

    beforeEach(module("cmUserModel"))

    beforeEach(inject(function(_cmUserModel_, _cmCrypt_) {
        cmUserModel = _cmUserModel_        
        cmUserModel.init({
            id : 'my_id',
            userKey: 'my_user_key'
        })
        cmCrypt = _cmCrypt_       
    }))

    it('should exist', function(){
        expect(cmUserModel).toBeDefined();
    })

    describe('public API', function(){
        it('should provide a function "isAuth"',function(){
            expect(cmUserModel.isAuth).toBeDefined();
        })

        it('should provide a function "setIdentity"',function(){
            expect(cmUserModel.setIdentity).toBeDefined();
        })

        it('should provide a function "isGuest"',function(){
            expect(cmUserModel.isGuest).toBeDefined();
        })

        it('should provide a function "doLogin"',function(){
            expect(cmUserModel.doLogin).toBeDefined();
        })

        it('should provide a function "doLogout"',function(){
            expect(cmUserModel.doLogout).toBeDefined();
        })

        it('should provide a function "storageSave"',function(){
            expect(cmUserModel.storageSave).toBeDefined();
        })

        it('should provide a function "storageGet"',function(){
            expect(cmUserModel.storageGet).toBeDefined();
        })

        it('should provide a function "storageRemove"',function(){
            expect(cmUserModel.storageRemove).toBeDefined();
        })

        it('should provide a function "getToken"',function(){
            expect(cmUserModel.getToken).toBeDefined();
        })

        it('should provide a function "storeToken"',function(){
            expect(cmUserModel.storeToken).toBeDefined();
        })

        it('should provide a function "removeToken"',function(){
            expect(cmUserModel.removeToken).toBeDefined();
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

        var good_key = '-----BEGIN RSA PRIVATE KEY-----MGACAQACEFhXgxfNAzZJ8Q3YpU4x9hsCAwEAAQIQDF99aej56TF5zFs6LBBveQIJAKDFUfKmtsZXAgkAjKtWvZtVC90CCBjUAEDSAD4HAghfDTfjjx58kQIIUHBhrwvxsKw=-----END RSA PRIVATE KEY-----',
            bad_key  = '',
            encrypted_secret = 'GGddYb0ZAZizKuN3zCikcg==' //contains 'priv'

        it('should provide functions "saveKey" and "loadLocalKeys" to store and retrieve rsa keys', function(){
            expect(cmUserModel.saveKey).toBeDefined();
            expect(cmUserModel.loadLocalKeys).toBeDefined();
        })

        it('should provide a function "decryptPassphrase" to decrypt passphrase', function(){            
            var badKey  = new cmCrypt.Key(bad_key),
                goodKey = new cmCrypt.Key(good_key),
                decrypted_secret
            
            expect(cmUserModel.decryptPassphrase).toBeDefined()
                        
            cmUserModel.saveKey(badKey)

            decrypted_secret = cmUserModel.decryptPassphrase(encrypted_secret)
            expect(decrypted_secret).toBeFalsy()

            cmUserModel.saveKey(goodKey)
            decrypted_secret = cmUserModel.decryptPassphrase(encrypted_secret)
            expect(decrypted_secret).toBe('priv')

        })

    })

});
