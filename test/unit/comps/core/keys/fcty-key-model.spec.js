'use strict';

describe('cmKeyModel', function() {

    var cmKey,
        key,
        publicKey   =   ['-----BEGIN PUBLIC KEY-----'
                        ,'MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQBW65EZMA3kk/KTp4dfLsYT'
                        ,'ZZo02XZ44flXpq34ZBF/FL4LQH/8LSbE5MzBAa0L2k2OPh9fnIcFfjW/gqpHtTDZ'
                        ,'hMFMhy1z9aUY3uwIIw9Tt8NJ6NHQjRBtQxv7jPLj1vD0K7Sl7j7AYyP8e0Rz9obT'
                        ,'WAIlKGQ45emKuEDIZ6nEZXW201NGDoycsvlzpMHtndKYXpVkmyor+uCVFDDmc0IS'
                        ,'q+15bIhRkkWBNnT+B7xtuVMSIkjSysgoR1CFUxFQLcGXiiA4n3oJyA751JdEGPdU'
                        ,'Q1FjhPHcqr+kslPzUonk9nKOY+VvfQb0D5GZT+8e05KfBiXaAmq8LcCAzozMRX3l'
                        ,'AgMBAAE='
                        ,'-----END PUBLIC KEY-----'].join("\n"),

        privateKey  =   ['-----BEGIN RSA PRIVATE KEY-----'
                        ,'MIIEogIBAAKCAQBW65EZMA3kk/KTp4dfLsYTZZo02XZ44flXpq34ZBF/FL4LQH/8'
                        ,'LSbE5MzBAa0L2k2OPh9fnIcFfjW/gqpHtTDZhMFMhy1z9aUY3uwIIw9Tt8NJ6NHQ'
                        ,'jRBtQxv7jPLj1vD0K7Sl7j7AYyP8e0Rz9obTWAIlKGQ45emKuEDIZ6nEZXW201NG'
                        ,'DoycsvlzpMHtndKYXpVkmyor+uCVFDDmc0ISq+15bIhRkkWBNnT+B7xtuVMSIkjS'
                        ,'ysgoR1CFUxFQLcGXiiA4n3oJyA751JdEGPdUQ1FjhPHcqr+kslPzUonk9nKOY+Vv'
                        ,'fQb0D5GZT+8e05KfBiXaAmq8LcCAzozMRX3lAgMBAAECggEAIzuHbENLTl0eFfXx'
                        ,'bIakKZakpEmFuUg37uyUVjwRz4ZT5nG1rz2KGoN378BDKavKhh7uTq4/GN3o4YEQ'
                        ,'jtKGQ5WJWQDuTrPCwUsTN9UmUFQLp/jkm3mir/dk71lZ1zr4HrFcn2nsK8XD/4Lj'
                        ,'43GJgz+IVxGBVoLzYJSBRfqnGQFiRkKshDb8g3bR9tn/sQ3gB+hBTO7BkGsyavj4'
                        ,'+HPO763MVVkkv/rz/FezH8I79ZdOYK1yFzpy3SFOoj6ULiA79rC5SW/Rcx7aFe3I'
                        ,'sw0IYG/UsEjNGR7XLvcwtkVJ2mqQAv0fN57b+x/lWHVyUwh5nYNfp9PL2bOfvcc+'
                        ,'xkz+/QKBgQCelTW/hOR+FrvVdqXU1DXMtzPQDrrARLQAJJ/Z4yLwjPzNWNJ7OEVz'
                        ,'1B5/6CfZxyniWbRojs8W2WaH9VrBRCOUPIk1ipfrjXoVolQwETdeygYljnFYdpYJ'
                        ,'r7I61NTGekk1THtbtm1aih9ad6Y6EwqKi52eEBmSk678Bedi8VowvwKBgQCMUKmg'
                        ,'D84MObTnM+9qWPIPDksNSosTWDPWCiMuCI7qOx4XqjW2ZVixHFpPu90rpo7JCpMR'
                        ,'Auasir/d2rDy0vUU3A/TMYqFXqswLU21MzsRoXicAzPyMUM0gjG9dapLJLXBCNkR'
                        ,'q74VQv9ZoyJwObdGQI56cJx1AD9h5HHXKqpWWwKBgHzaoRyOdo9HOs+PwHRWN51b'
                        ,'x/FRB3uFG+rY6vnTOJkHh6ns+pqE7TmKkhDGKUnu4m0Rj1aayTUGKRF1/OQYz6JQ'
                        ,'Hv8GhSGxm6MY0QufImcAy+IZyeeKRgqOR9bF5lf1w1mxQ5YrhOE5ygGiHj+u6ie2'
                        ,'UHw31Mpwd954j3p45zdlAoGBAISWlDLTvHiA7xiqUsnDUrg3YWQl1FVrO1A+NBAD'
                        ,'tkhPpJfoFulLywtRJ2XAt7XPpY0DmQSyIRdZ5QPW6u4Jud0ENU/zuFleo5TaultH'
                        ,'FcILOtTxkdyCAGdVv3qv/UMUZUsK+VNhXjTpIjGpnZk+cJjJ19iLIMzOdxYhsBEK'
                        ,'F/uRAoGABes78YQO0CBNpuYIzHICictjJ1tXRh9jTwFo67aAdVFgK0Qg1b0kIh43'
                        ,'MPY2RWLIIN+Noak2DRvC4XmNGxtejZPPnJC5CG1ZZVULMHREDofvjb9ICCajsCWx'
                        ,'7YuDDep7j1qMhc8/C3ADqZ9Bs505zPoN1SdrkWblLeTS0Zh6vq8='
                        ,'-----END RSA PRIVATE KEY-----'].join("\n"),
        secret      = 'priv'

    beforeEach(module('cmCore'))

    beforeEach(inject(function(_cmKey_){
        cmKey   = _cmKey_
        key     = new cmKey()
    }))

    it('should provide "cmKeyFactory"', function(){
        expect(cmKey).toBeDefined()
    })

    it('should have methods', function(){
        var key = new cmKey()
        expect(key.setId).toBeDefined()
        expect(key.setName).toBeDefined()
        expect(key.setKey).toBeDefined()
        expect(key.getPublicKey).toBeDefined()
        expect(key.getFingerprint).toBeDefined()
        expect(key.getPublicKeyForSigning).toBeDefined()
        expect(key.getPrivateKey).toBeDefined()
        expect(key.encrypt).toBeDefined()
        expect(key.decrypt).toBeDefined()
        expect(key.trusts).toBeDefined()
        expect(key.getSize).toBeDefined()
        expect(key.importJSEncrypt).toBeDefined()
        expect(key.exportJSEncrypt).toBeDefined()
        expect(key.importData).toBeDefined()
        expect(key.exportData).toBeDefined()
    })




    it('should provide a functions "setKey", "getPublicKey" and "getPrivateKey" to import and retrieve a public or private key', function(){                                

        expect(key.setKey).toBeDefined()                
        expect(key.getPublicKey).toBeDefined()                
        expect(key.getPrivateKey).toBeDefined()                
    
        key.setKey(publicKey)

        expect(key.getPrivateKey()).toBeFalsy()                
        expect(key.getPublicKey()).toBe(publicKey)

        key.setKey(privateKey)
        
        expect(key.getPrivateKey()).toBe(privateKey)
        expect(key.getPublicKey()).toBe(publicKey)                 
        
    })      

    it('should provide a functions "encrypt" and "decrypt" to encrypt strings with a public key and decrypt with the according private key', function(){                                

        key.setKey(publicKey)

        var encrypted_secret = key.encrypt(secret)                

        expect(encrypted_secret).toBeDefined()
        expect(encrypted_secret).not.toEqual('priv')

        key.setKey(privateKey)
    
        var decrypted_secret = key.decrypt(encrypted_secret)

        expect(decrypted_secret).toBeDefined()
        expect(decrypted_secret).toEqual('priv')
    })

    it('should provide a function "getSize" to detect keysizes', function(){
        expect(typeof  key.getSize).toBe('function')  
    })

    it('should provide a function "setName" to give a name to the key', function(){
        expect(typeof key.setName).toBe('function')  
        key.setName('my_test_name')
        expect(key.name).toBe('my_test_name')
    })

    it('should provide a function "setId" to set the key\'s id', function(){
        expect(typeof key.setId).toBe('function')  
        key.setId('my_test_id')
        expect(key.id).toBe('my_test_id')
    })

})
