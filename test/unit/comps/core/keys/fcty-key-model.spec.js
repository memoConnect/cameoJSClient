'use strict';

describe('cmKeyModel', function() {

    window.Worker = undefined;

    var cmKey,
        cmCrypt,
        $rootScope,
        key, key_1, key_2,
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

        new_key_1   =   ['-----BEGIN RSA PRIVATE KEY-----'
                        ,'MIIEowIBAAKCAQEAm2NqiVoqfxXZiYVRMLCUXqnqlMLyce2ZPubTVeLau3MqN5k6'
                        ,'DOY4h8AnI1nfukp7L0ehkM24l+kaQp0s8rwe301BpnlwaMd72oTeHH/bwIlPZS5K'
                        ,'Sl/VqPoEeukNNYr+Lla3G7yizF03v9IDzW3UkvIyvz4X7ykIvakH6ByWPdajOhL+'
                        ,'QyE5JN5HzLQJLqB0NpsU8qKMroYmnpesoEAzoopt3DT4WYOiqWP3n9bNwON/lcV0'
                        ,'afdSGKNMgbJlRlHlWQL+tZI7Lgxk4yR8sEEQQHSC/o8B6YpMPraiqxUdmsa2IsvE'
                        ,'ZoTwBgzHWNRFOs9ZPw5fypDF5PEtMVfErH3HeQIDAQABAoIBAD06j2BQBy7MjUuD'
                        ,'HNryuYQTsDuuFZqO5TPEAMJ3AXmbh6cg2Z77mIrlTIbBg0cE0kVvFFratUImuBJH'
                        ,'nM6JEiErcBMJByJCeKtCb8MLHqxfbsmP0/Y6jRZobhuAeZP/kOjxgnWLfxrIII+V'
                        ,'UapA/OJqTVTOQuAaazdQw6zSluEGdPISDR5n3JiO25HbwAbHav16KCkT9J64tBjr'
                        ,'ROX97KtJ7/BzNZDSa3XAfr0eaGZp+nDKlaGVYKv7VEuZWcb5QQN59A6bJ6y/i+88'
                        ,'r/3wBYq6JFGxQt5XoKcSsnOepCnY9mZPCdRl9ZHKNndwckRDAgql1eJqqKImngz7'
                        ,'vaMoYAECgYEA1n0F30njxBlZ3lHbCpGOjlUXnJUfDau8q/LT2qFa8QQO68reBINe'
                        ,'ntPMUdxp3a8ZW45/gg9bSjgBqHAommutzOmkCdVRvgN6mLda76NafjnXT1MFXPTf'
                        ,'N6UiCpP7+dfMiMuZ262Ltny2utv6Q2sQlYJVs5By1JTyKO8oC9x0veECgYEAuXY9'
                        ,'qhJo92uFzHJeXmPlT3fTrApwfEm2k46WKWDjzmx0Qlx9mB5kfydRVnsgbpgcSxlO'
                        ,'IX/uzc/bsLBVFHJnG/T45O4PGSmL18MEj/VtCf0ZuMl1xcrZZ7m+2WA1IwsEAjSQ'
                        ,'SCxJYjkUnmT9wdgZbaJQTPpZeKPozxZ4lAaJzJkCgYEAmaGHeT5VtHpsEoATIujL'
                        ,'cUul0/RD/+jJBWizMmBs4UGE5oOyrwzh02XlbaUw9yaaRSg2UJRrUSf4mAtuKd2C'
                        ,'6clYQ+rV2AJp58U9j3Q0N0F65UiUCNcko5jWXzlMPNLDoCAlnmIaNqXxxLoX8f5Y'
                        ,'LJ7kf++xMG9XXNagmo5X2EECgYB4BJ+1LsLE0s08WArf1I+x1J6jqAHRPLatWMmu'
                        ,'L2hczmySAV65kXmBm8UUTQvY5hDxPIgGP88fW1MVTZdRaxN00Rw8sh4NL4iy8R5D'
                        ,'txSAMU1y+tR/Ul1MtbRe4dahPeCzOKbiPd6jdML2Ge7pgdo6y55homVCH/hqA2W2'
                        ,'jWChiQKBgFW2+v22sIknYehisgQMkKb8TPkZjMay7E4CsB6Lpd+jru6D3agkd4ef'
                        ,'ilJns7qEL7B+Mlru0qUbsp74m0cnezltZ/0zz2HiJa1fJUD3+AiUXAE0JpQJsyB3'
                        ,'kS8sazAGHA6y2M85F3AiQV0IxtXyVU1rcHqycvU81wvoMorFrsIY'
                        ,'-----END RSA PRIVATE KEY-----'].join('\n'),
        new_key_2   =   ['-----BEGIN RSA PRIVATE KEY-----'
                        ,'MIIEpQIBAAKCAQEA6pap8EqXwCyoA1c1m4V4Y60TsBIwCdwYkrZRrSYP6wxUm7Bb'
                        ,'sm7J5cgpe/8W24ZZlAEUA82llsPUTkTlE4mH3k5E6A+0StpGJkXmek/n+xD5KFhx'
                        ,'+xfzh3zRs3VPozVPyDmlxb+OU2aue+k3SNhykjtDK/CHIORDOm6rvM7sWJIlH9Cg'
                        ,'DHLMGYV10YbAH0aqtZDJRRdQPxLjeRbbUhnjbAZgAvpoKZyxKmDvYoi7BD9QMQ/b'
                        ,'x9ARiUj1l+JHepp/+eaHYY1uwaO4n4hixyr1ylz1613GjI6DPUdFnUfyoPpfHFH2'
                        ,'4vv24/CcWucy/QEOuiFt253qDzymHT/u/Fv2pwIDAQABAoIBAQCuAmY6BMq91SIn'
                        ,'oDf2jbG4ljjFYShbF/TuVukM++/Q1YupFM9f8wg2Nxx2isiEvAqUW5xiGdgbllVU'
                        ,'XYxiyqCLCRnZ3VRKNdDVMQJ+delI9dUr1TdvHtwZA0B10q3pDXGJvyE1JxtGyCLj'
                        ,'bSICGfQafnUcEcXaYxdvL4qaeg8cvpeG3man5ipfQ7guMQIpYkZwJ2rQ7UJbFKV7'
                        ,'0VkTuK1wQO3lU3WUHNsbkYRf2+fefpL3S7hXBXH7BXho8LXzNLg/ZRednNU68DhA'
                        ,'jGuRlOnyE9oFk0blH0ccNkc2tirQTdS6fjCjoltyZjURNcnoigCrlH8CdsgUzTvf'
                        ,'ljcyPOZhAoGBAP9c5X6KpX+eOcbAaTjIFMSxbgesjXV3UoWJMHAgvnSaG1ong4nQ'
                        ,'iBjOnhFW3lZK/oMnd7JnPORGC1PzCwLcDN91F8KxNu1D20mc+SSFjyu/Jgn8xG6H'
                        ,'VhlsRS091wiv6MEvR5hu1F5xZ5SJccKjOmW6FJUK5Eas8lN5w4CjDhx3AoGBAOss'
                        ,'f57/BQ9TCTUwa9QDPvr6aPrF7Svho7S5litiIgVvf5KudWJOxGWXV/daNS1b9lCn'
                        ,'QIEd5ZyuEOuNGySk5o2OFbEccAq4qnf4BMFS4k9QBFci/AGzs1U+mpPeJBboAKON'
                        ,'vZwgL+Ds/pqXmzjtwNxxBGxhtOwVmp8pNmNXIPNRAoGBAJiI+gDTerY3YlWpW3Dy'
                        ,'ew1e2tW0qa7v/pgLcaaYuItX/lyk27q3mIQQ73R2CktLcqoPKj2j00ib2mpj9EDa'
                        ,'Bsp33CCM0L17WgKnxF6fdPzxqhwvI3rOVozLEqtKlCb5RLQYtNCF608auH+OdiiI'
                        ,'bfqT43V/0wmwhvN7+V7ehzBTAoGAQSiNG5Jw5nQNQw1tcsqLcqJa39BjDBtybipV'
                        ,'byO7ZWIlKJDpuRk11Sf/mWsG/NBUCLiuaJfN/IFF8t2fvaFqt6G8ZNwKNw4/PQoc'
                        ,'1yuNxIfZDAOHazlM4Lt9vKZ5vVb+hlJJTK6mVV2UlWSX/0fwfaNapGTV6et6ccrL'
                        ,'ZO7JFGECgYEAxkio7YWuk/xjB38iWlhPPQA/Jbwdxr4uQH9YNALZqCdE6D2ycZJn'
                        ,'3PV7nFq8vRWe+vjLhyPTYuVXt3Gut8PHg8BO+MSSUYWRsICsTTGK5L58oUxzpfDE'
                        ,'13bOyHlnS+21aUkXGzpRJ/0zd5HSy7MzvfNmGkfdZC5l2CipcsVuYF4='
                        ,'-----END RSA PRIVATE KEY-----'].join('\n'),
        secret      = 'priv'


    beforeEach(module('cmCore'))

    beforeEach(inject(function(_cmKey_, _cmCrypt_, _$rootScope_){
        cmKey       = _cmKey_
        cmCrypt     = _cmCrypt_
        $rootScope  = _$rootScope_
        key     = new cmKey()
        key_1   = new cmKey()
        key_2   = new cmKey()

        key_1
        .setKey(new_key_1)
        .setId('key_1')

        key_2
        .setKey(new_key_2)
        .setId('key_2')
    }))

    it('should provide "cmKeyFactory"', function(){
        expect(cmKey).toBeDefined()
    })

    it('should have certain methods', function(){
        var key = new cmKey()
        expect(key.setId).toBeDefined()
        expect(key.setName).toBeDefined()
        expect(key.setKey).toBeDefined()
        expect(key.getPublicKey).toBeDefined()
        expect(key.getFingerprint).toBeDefined()
        expect(key.getPrivateKey).toBeDefined()
        expect(key.encrypt).toBeDefined()
        expect(key.decrypt).toBeDefined()
        expect(key.sign).toBeDefined()
        expect(key.verify).toBeDefined()
        expect(key.verifyKey).toBeDefined()
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

    describe('de- and encryption', function(){
        it('should provide a functions "encrypt" and "decrypt"', function(){
            expect(key.encrypt).toBeDefined()
            expect(key.decrypt).toBeDefined()
        })


        it('should encrypt strings with a public key and decrypt with the according private key', function(){                                

            var encrypted_secret,
                decrypted_secret

            runs(function(){
                key
                .setKey(publicKey)
                .encrypt(secret)
                .then(function(result){
                    encrypted_secret = result
                })

                $rootScope.$apply()
            })

            waitsFor(function(){
                return !!encrypted_secret
            }, "encryption to be done.", 1000)

            runs(function(){
                expect(encrypted_secret).not.toEqual('priv')

                key
                .setKey(privateKey)
                .decrypt(encrypted_secret)
                .then(function(result){
                    decrypted_secret = result                    
                })

                $rootScope.$apply()
            })

            waitsFor(function(){
                return !!decrypted_secret
            }, "decryption to be done.", 1000)

            runs(function(){
                expect(decrypted_secret).toEqual('priv')
            })
        })
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

    it('should provide a function "getFingerprint" to return a fingerprint.', function(){
        expect(key_1.getFingerprint()).toBeDefined()
        expect(key_2.getFingerprint()).toBeDefined()
        expect(key_1.getFingerprint()).not.toBe(key_2.getFingerprint())

        //Has to use the same hashing method has cmCrypt.hash():
        //expect(key_1.getFingerprint()).toBe('7XiLqw1US1LarDT8QEM7MvxypdH1nvCyUz7AuxaVA1M')
        expect(key_1.getFingerprint()).toBe('key_1')

    })

    describe("signing and verification", function(){
        it('should provide functions to sign data and verify signatures.', function(){
            expect(typeof key.sign).toBe('function')
            expect(typeof key.verify).toBe('function')
        })

        it('should provide functions to verify keys.', function(){
            expect(key.verifyKey).toBeDefined()
        })

        it('should provide functions to sign data and verify signatures', function(){
            var data =  {
                key_1 : 'my value',
                key_2 : 'my_second_value'
            },
            pub_key = new cmKey(),
            signature,
            failed,
            success

            key.setKey(privateKey)
            pub_key.setKey(publicKey)

            //sign hashed Object

            runs(function(){
                signature = undefined

                key.sign(cmCrypt.hashObject(data))
                .then(function(result){
                    signature = result
                })               

                $rootScope.$apply()
            })

            waitsFor(function(){
                return typeof signature != 'undefined'
            }, 'signing to be done.', 2000)

            runs(function(){
                failed = undefined
                pub_key.verify('abc', signature)
                .catch(function(){
                    failed = true
                })
                $rootScope.$apply()
            })

            waitsFor(function(){
                return failed
            }, 'verification to fail.')

            runs(function(){
                success = undefined
                pub_key.verify(cmCrypt.hashObject(data), signature)
                .then(function(){
                    success = true
                })
                $rootScope.$apply()                
            })

            waitsFor(function(){
                return success
            }, 'verification to finish successfully.', 2000)

        })
    })


    it('should provide a function to verify a key.', function(){

        key.setKey(privateKey)

        var data        =   {
                                id:'my_id',
                                fingerprint: key_1.getFingerprint()
                            },
            signature   =   undefined,
            success     =   undefined,
            failed      =   undefined

        runs(function(){
            key.sign(cmCrypt.hashObject(data))
            .then(function(result){
                signature = result
            })
            $rootScope.$apply()
        })

        waitsFor(function(){
            return typeof signature != 'undefined'
        }, 'signing to finish successfully.', 2000)

        runs(function(){
            key_1.importData({signatures : [{keyId:'signing_key', content: signature}] })
            key.setId('signing_key')

            success = false

            //always verifies itself:
            key.verifyKey(key, cmCrypt.hashObject(data))
            .then(function(){
                success = true
            })
            $rootScope.$apply()
        })

        waitsFor(function(){
            return success
        }, 'verification of "key" to finish successfully.', 2000)

        runs(function(){
            failed = false

            //dont verify a key without signatures:
            key.verifyKey(key_2, cmCrypt.hashObject(data))
            .catch(function(){
                failed = true
            })
            $rootScope.$apply()
        })

        waitsFor(function(){
            return failed
        }, 'verification to fail.')

        
        runs(function(){
            success = false
            key.verifyKey(key_1, cmCrypt.hashObject(data))
            .then(function(){
                success = true
            })
            $rootScope.$apply()
        })

        waitsFor(function(){
            return success
        }, 'verificatiuon of "key_1" to finish successfully.', 2000)
    })

})
