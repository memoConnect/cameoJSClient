'use strict';

angular.module('cmCrypt', ['cmLogger'])
.service('cmCrypt',[
    'cmLogger',
    '$q',
    '$rootScope',
    function (cmLogger, $q, $rootScope) {
        // private vars
        var async = {
            interval: null,
            promise: null,
            crypt: null
        };


        function Key(data){
            //Wrapper for RSA Keys
            var crypt 

            if(
                   "getPublicKey"  in data
                && "getPrivateKey" in data
                && "encrypt"       in data
                && "decrypt"       in data
            ){
                crypt = data
            }else{
                crypt = new JSEncrypt()
                crypt.setKey(key)
            }

            this.setId = function(id){
                this.id = id
                return this
            }

            this.setName = function(name){
                this.name = name
                return this
            }

            this.getPublicKey = function(){
                return crypt.getPublicKey()
            }

            this.getPrivateKey = function(){
                return crypt.getPrivateKey()
            }

            this.encrypt = function(secret){
                return crypt.encrypt(secret)
            }

            this.decrypt = function(encrypted_secret){
                return crypt.decrypt(encrypted_secret)
            }

            this.getSize = function(){
                return crypr.key.n.bitLength()
            }
        }


        return {
            /**
             * this method calculates a secure hash
             * @param secretString String that should be hashed
             */
            hash: function (secretString) {
                if (null == secretString)
                    return "";

                return sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(secretString))
            },

            /**
             * this method encrypts strings
             * @param secretKey a secret key with max len of 10 chars
             * @param secretString a string that should be enrypted
             * @returns base64 encoded encrypted string
             */
            encryptWithShortKey: function (secretKey, secretString) {
                var parameters = { cipher: "aes", ks: 256, iter: 4096 };

                if (null == secretString)
                    return "";
                if (secretKey.length > 10)
                    return "";

                var encryptedSecretString = sjcl.json.encrypt(String(secretKey), String(secretString), parameters);

                return _Base64.encode(encryptedSecretString);
            },
            /**
             * this method encrypts strings
             * @param secretKey a secret key with min len of 60 chars
             * @param secretString a string that should be encrypted
             * @returns base64 encoded encrypted string
             */
            encrypt: function (secretKey, secretString) {
                var parameters = {cipher: "aes", ks: 256, iter: 500 };

                if (null == secretString)
                    return "";

                if (secretKey.length < 60)
                    return "";

                var encryptedSecretString = sjcl.json.encrypt(String(secretKey), String(secretString), parameters);

                return _Base64.encode(encryptedSecretString);
            },
            /**
             * this method decrypts uuencoded strings
             * @param secretKey a secret key
             * @param secretString a base64 encoded string that should be decrypted
             * @returns decrypted string
             */
            decrypt: function (secretKey, secretString) {
                if (null == secretString)
                    return false;

                var decodedSecretString = _Base64.decode(secretString),
                    decryptedString;

                try {
                    decryptedString = sjcl.decrypt(secretKey, decodedSecretString)
                } catch (e) {
                    //cmLogger.warn('Unable to decrypt.', e)
                }

                return decryptedString || false
            },




            /**
             * return the bit size of possible keygeneration
             * @returns {string[]}
             */
            getKeySizes: function(){
                return ['512','1024','2048','4096'];
            },

            /**
             * start async process
             * @param keylen
             * @param $scopeState
             * @returns {Promise.promise|*|webdriver.promise.Deferred.promise}
             */
            generateAsyncKeypair: function(keySize, onGeneration){
                if ( keySize == undefined ||
                    typeof keySize != 'number' ||
                    async.interval != null ) {
                    return false;
                }

                cmLogger.debug('jsencrypt generateAsync '+keySize);

                // Create the encryption object.
                var self = this,
                    time = -((new Date()).getTime()),
                    counts = 0;
                // init vars
                async.crypt = new JSEncrypt({default_key_size: keySize}),
                async.promise = $q.defer();
                async.interval = setInterval(function () {
                    counts++;
                    if(typeof onGeneration == "function"){
                        onGeneration(counts, (time + ((new Date()).getTime())))
                    }
                }, 500);
                // start keypair generation
                async.crypt.getKey(function () {
                    self.cancelGeneration(true);

                    async.promise.resolve({
                        timeElapsed: (time + ((new Date()).getTime())),
                        counts: counts,
                        key : new Key(async.crypt)
                        //privKey: async.crypt.getPrivateKey(),
                        //pubKey: async.crypt.getPublicKey()
                    })

                    $rootScope.$apply() 
                });

                return async.promise.promise;
            },
            /**
             * cancel key generation process / simple clearInterval
             * if interval is pending
             * @returns {boolean}
             */
            cancelGeneration: function(withReject){
                if ( async.interval != null ) {
                    cmLogger.debug('jsencrypt cancelGeneration');
                    // clear interval
                    var id = async.interval;
                    async.interval = null;
                    clearInterval( id );
                    // clear promise and library vars if param withReject is true
                    if(withReject == undefined && async.promise != undefined){
                        async.promise.reject();
                        async.promise = null;
                        async.crypt = null;
                    }
                    return true;
                }
            return false;
            },

            generatePassphrase: function(){ //@Todo!!
                var bad_random_passphrase = _Base64.encode((Math.random()*(new Date()).getTime()).toString())
                return bad_random_passphrase.slice(bad_random_passphrase.length-10, bad_random_passphrase.length)
            }
        }
    }]
);