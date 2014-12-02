'use strict';

angular.module('cmCore')
.service('cmKeyCache',[
    function(){
        var cache = {}

        return {
            storeVerificationResult : function(key, data, signature, result){
                cache.verify                = cache.verify || {}
                cache.verify[key.id]        = cache.verify[key.id] || {}
                cache.verify[key.id][data]  = cache.verify[key.id][data] || {}
                cache.verify[key.id][data][signature] = result
            },

            getVerificationResult : function(key, data, signature){
                return  cache.verify && cache.verify[key.id] && cache.verify[key.id][data]
                        ?   cache.verify[key.id][data][signature]
                        :   null
            }
        }
    }
])
.factory('cmKey', [

    'cmLogger',
    'cmObject',
    'cmWebworkerFactory',
    'cmCryptoHelper',
    'cmKeyCache',
    '$rootScope',
    '$q',

    function(cmLogger, cmObject, cmWebworkerFactory, cmCryptoHelper, cmKeyCache, $rootScope, $q){
        /**
         * @TODO TEsts!!!!!
         * @param args
         * @returns {*}
         */
        function cmKey(data){
            //Wrapper for RSA Keys
            var self        = this,
                crypt       = undefined, // will be JSEncrypt() once a key is set
                verificationCache = {}


            cmObject.addEventHandlingTo(this);

            this.created    = 0
            this.signatures = []
            

            function init(data){
                self.importData(data)
            }

            function reset(){
                self.created    = 0;
                self.signatures = [];
            }


            this.importData = function(data){
                if(!data){
                    cmLogger.debug('cmKey:importData: missing data')
                    return self
                }

                var key =       data.privKey
                            ||  this.getPrivateKey()
                            ||  data.key
                            ||  data.pubKey
                            ||  undefined;

                if(data.name)       this.setName(data.name);
                if(data.id)         this.setId(data.id);
                if(data.created)    this.created = data.created;
                if(data.signatures) Array().push.apply(this.signatures, data.signatures)

                if(key) this.setKey(key);

                return this;
            };

            this.exportData = function(){
                var data        = {},
                    private_key = this.getPrivateKey(),
                    public_key  = this.getPublicKey(),
                    size        = this.getSize();

                if(this.id)         data.id         = this.id;
                if(this.name)       data.name       = this.name;
                if(this.signatures) data.signatures = this.signatures;
                if(this.created)    data.created    = this.created;
                if(public_key)      data.pubKey     = public_key;
                if(private_key)     data.privKey    = private_key;
                if(size)            data.size       = size;

                return data;
            };

            this.setId = function(id){
                this.id = id;
                return this;
            };

            this.setName = function(name){
                this.name = name;
                return this;
            };

            // set either public or private key
            this.setKey = function(key){
                crypt = crypt || new JSEncrypt()
                crypt.setKey(key);
                return this;
            };

            this.getPublicKey = function(){
                var public_key;
                try{
                    public_key = crypt.getPublicKey();
                }catch(e){}

                return public_key;
            };

            /**
             * @todo sinnvoll einsetzen
             */
            this.checkFingerprint = function(){
                var fingerprint = sjcl.codec.base64.fromBits(sjcl.hash.sha256.hash(this.getPublicKey()), true, true);

                if(typeof this.id != 'undefined'){
                    if(this.id != fingerprint){
                        this.trigger('fingerprintCheck:failed');
                    }
                }
            };

            this.getFingerprint = function(){
                return this.id //Todo: rework Fingerprints, was:  sjcl.codec.base64.fromBits(sjcl.hash.sha256.hash(this.getPublicKey()), true, true)
            };

            this.getPrivateKey = function(){
                var private_key;
                try{
                    private_key = crypt.getPrivateKey();
                }catch(e){}

                return private_key;
            };

            this.sign = function(data){
                var promise =   cmCryptoHelper.isAvailable()
                                ?   cmCryptoHelper.rsaSign(self.getPrivateKey(), data)
                                :   cmWebworkerFactory.get({
                                        jobName:    'rsa_sign',
                                        params:     {
                                                        privKey:    self.getPrivateKey(),
                                                        data:       data
                                                    }
                                    })
                                    .then(
                                        function(worker){
                                            return  worker.run()
                                        },
                                        function(reason){
                                            return  $q.when(crypt && crypt.sign(data))
                                                    .then(function(signature){
                                                        return  signature
                                                                ?   $q.when(signature)
                                                                :   $q.reject()
                                                    })
                                        }
                                    )

                return  promise                                  
                        .then(function(signature){
                            cmKeyCache.storeVerificationResult(self, data, signature, true)
                            return $q.when(signature)
                        })
            };

            this.verify = function(data, signature, use_cache){
                if( 
                        use_cache
                    &&  cmKeyCache.getVerificationResult(self, data, signature) != null
                   
                ){
                    //console.log('cached!')
                    return  cmKeyCache.getVerificationResult(self, data, signature)
                            ?   $q.when(true)
                            :   $q.reject(false)
                }

                var promise =   cmCryptoHelper.isAvailable()
                                ?   cmCryptoHelper.rsaVerify(self.getPublicKey(), data, signature)
                                :   cmWebworkerFactory.get({
                                        jobName :   'rsa_verify',
                                        params  :   {
                                                        pubKey:     self.getPublicKey(),
                                                        signature:  signature,
                                                        data:       data
                                                    }
                                    })
                                    .then(
                                        function(worker){
                                            return  worker.run()
                                        },
                                        function(reason){
                                            return  $q.when(crypt && crypt.verify(data, signature, function(x){ return x }))
                                                    .then(function(result){
                                                        return  result
                                                                ?   $q.when(result)
                                                                :   $q.reject('webWorker substitute failed.')
                                                    })
                                        }
                                    )
                                    .catch(function(reason){
                                        cmKeyCache.storeVerificationResult(self, data, signature, false)
                                        return $q.reject(reason)
                                    })

                return  promise
                        .then(function(result){
                            cmKeyCache.storeVerificationResult(self, data, signature, true)
                            return $q.when(result)
                        })
                        .catch(function(reason){
                            cmLogger.warn('cmKey: verification failed: '+reason)
                        })
            }

            this.encrypt = function(secret){

                if(cmCryptoHelper.isAvailable())
                    return cmCryptoHelper.rsaEncrypt(self.getPublicKey(), secret)


                return  cmWebworkerFactory.get({
                            jobName :   'rsa_encrypt',
                            params  :   {
                                            pubKey:     self.getPublicKey(),
                                            secret:     secret
                                        }
                        })
                        .then(
                            function(worker){
                                return  worker.run()
                            },
                            function(reason){
                                return  $q.when(crypt && crypt.encrypt(secret))
                                        .then(function(result){
                                            return  result
                                                    ?   $q.when(result)
                                                    :   $q.reject('webWorker substitute failed.')
                                        })
                            }
                        )
                        .catch(function(reason){
                            cmLogger.warn('keyModel.encrypt() failed:'+ reason)
                            return $q.reject(reason)
                        })
            };

            this.decrypt = function(encrypted_secret){

                if(cmCryptoHelper.isAvailable())
                    return cmCryptoHelper.rsaDecrypt(self.getPrivateKey(), encrypted_secret)


                return  cmWebworkerFactory.get({
                            jobName :   'rsa_decrypt',
                            params  :   {
                                            privKey:            self.getPrivateKey(),
                                            encryptedSecret:    encrypted_secret
                                        }
                        })
                        .then(
                            function(worker){
                                return  worker.run()
                            },
                            function(reason){
                                return  $q.when(crypt && crypt.decrypt(encrypted_secret))
                                        .then(function(result){
                                            return  result
                                                    ?   $q.when(result)
                                                    :   $q.reject('webWorker substitute failed.')
                                        })
                            }
                        )
                        .catch(function(reason){
                            cmLogger.warn('keyModel.decrypt() failed:' +reason)
                            return $q.reject(reason)
                        })

            };

            this.verifyKey = function(key, data, use_cache){
                return      (this.getPublicKey() == key.getPublicKey() 
                        ?   $q.when(key)   //always verifies itself
                        :   key.signatures.reduce(function(previous_try, signature){
                                return  previous_try
                                        .catch(function(){
                                            return  (self.id == signature.keyId)
                                                    ?   self.verify(data, signature.content, use_cache)
                                                    :   $q.reject('keyIds not matching.')
                                        })
                            }, $q.reject('no signatures.'))
                            .then(function(result){
                                return $q.when(result)
                            })
                        )
            };

            this.getSize = function(){
                var size

                try{
                    size = crypt.key.n.bitLength();
                } catch(e){

                }

                //Todo: dirty workaround :)
                if(size == 127 || size == 1023 || size == 2047 || size == 4095)
                    size = size+1;

                return size;
            };

            this.importJSEncrypt = function(jse){
                crypt = jse
                return this
            };

            this.exportJSEncrypt = function(){
                return crypt
            };

            $rootScope.$on('logout', function(){ reset() });
            $rootScope.$on('identity:switched', function(){ reset() });

            init(data)
        }

        return cmKey;
    }
])
