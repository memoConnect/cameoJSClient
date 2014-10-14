'use strict';

var cmUserModel,
    cmCrypt,
    $rootScope,
    $httpBackend

window.Worker = undefined

describe('cmUserModel', function(){
    var cmUserModel,
        cmKey;

    beforeEach(function(){
        module(function($provide){
            $provide.constant('cmEnv',{});
        })
    })

    beforeEach(module('cmCore'))

    beforeEach(inject(function(_cmUserModel_, _cmKey_, _$rootScope_, _$httpBackend_) {
        //@TODO: UserModel initiert sich beim inject und ruft die api auf, promises werden erst mit flush oder $apply aufgelöst, überlegen wir wir das anders organisieren
        cmUserModel     = _cmUserModel_
        $rootScope      = _$rootScope_
        $httpBackend    = _$httpBackend_
//
        cmKey = _cmKey_
        cmUserModel.setAuth() //@todo ???
        cmUserModel.importData({
            id : 'my_id_moep',
            userKey: 'my_user_key'
        },[])
//        _$rootScope_.$apply()

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
        it('should be true, when user is active and has id.',function(){
            cmUserModel.data.isActive = true;
            cmUserModel.data.id = 'moep';
            expect(cmUserModel.isAuth()).toBeTruthy();
        })

        it('should be false, when user is active and has no id.',function(){
            cmUserModel.data.isActive = true;
            expect(cmUserModel.isAuth()).toBeFalsy();
        })

        it('should be false, when user is inactive and has id.',function(){
            cmUserModel.data.id = 'moep';
            expect(cmUserModel.isAuth()).toBeFalsy();
        })
    })

    describe('Encryption and key management', function(){

        var good_key, bad_key, encrypted_secret

        beforeEach(function(){
            good_key = (new cmKey() ).setKey('-----BEGIN RSA PRIVATE KEY-----MGACAQACEFhXgxfNAzZJ8Q3YpU4x9hsCAwEAAQIQDF99aej56TF5zFs6LBBveQIJAKDFUfKmtsZXAgkAjKtWvZtVC90CCBjUAEDSAD4HAghfDTfjjx58kQIIUHBhrwvxsKw=-----END RSA PRIVATE KEY-----'),
            bad_key  = (new cmKey() ).setKey(''),
            encrypted_secret = 'FLgA/4gztg9pcxNSkqxGPA==' //contains 'priv'
        })

        it('should provide functions "storeKey" and "loadLocalKeys" to store and retrieve rsa keys.', function(){
//            console.log('start test')
            expect(cmUserModel.storeKey).toBeDefined();
            expect(cmUserModel.loadLocalKeys).toBeDefined();

            good_key.setId('my_good_key')

            cmUserModel.storeKey(good_key)

            var privateKey = ''

            cmUserModel.loadLocalKeys().forEach(function(key){
                if(key.id == 'my_good_key') privateKey = key.getPrivateKey()
            })

            expect(privateKey).toBeTruthy()
            expect(privateKey).toBe(good_key.getPrivateKey())
        })

        it('should provide a function "clearLocalKeys" to remove all Keys from local stroage.', function(){
            cmUserModel.storeKey(good_key)
            expect(cmUserModel.loadLocalKeys().length).toBeGreaterThan(0)

            cmUserModel.clearLocalKeys()
            expect(cmUserModel.loadLocalKeys().length).toBe(0)
        })

        describe('passphrase decryption', function(){


            it('should provide a decrypting function.', function(){
                expect(cmUserModel.decryptPassphrase).toBeDefined()             
            })

            it('should fail with bad local keys.', function(){            
                
                var failed

                runs(function(){
                    cmUserModel.clearLocalKeys()
                    cmUserModel.storeKey(bad_key)
                    cmUserModel.decryptPassphrase(encrypted_secret)
                    .catch(function(){
                        failed = true
                    })
                    $rootScope.$apply()
                })

                $httpBackend.expectGET('/account').respond({})

                waitsFor(function(){
                    return failed
                }, "decryption to fail.", 1000)

            })                    

            it('should properly decrypt with good local keys.', function(){            
                
                var decrypted_secret

                runs(function(){
                    cmUserModel.storeKey(good_key)
                    cmUserModel.decryptPassphrase(encrypted_secret)    
                    .then(function(result){
                        decrypted_secret = result
                    })
                    $rootScope.$apply()
                })

                $httpBackend.expectGET('/account').respond({})

                waitsFor(function(){
                    return decrypted_secret !== undefined
                }, "decryption to finish", 1000)
                
                runs(function(){                
                    expect(decrypted_secret).toBe('priv')
                })
            })            

        })


    })
})
