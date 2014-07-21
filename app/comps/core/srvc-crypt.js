'use strict';

angular.module('cmCore')
.service('cmCrypt',[
    'cmLogger', 'cmKey',
    '$q', '$interval', '$rootScope',
    function (cmLogger, cmKey,
              $q, $interval, $rootScope) {
        // private vars
        var async = {
            interval: null,
            promise: null,
            crypt: null
        };

        return {
            /**
             * now cmKey
             */
            Key: cmKey,

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
             * this methods encodes a string base64
             * @param string
             * @returns {*}
             */
            base64Encode: function(string){
                return _Base64.encode(string);
            },

            /**
             * this method decodes a string base64
             * @param string
             * @returns {*}
             */
            base64Decode: function(string){
                return _Base64.decode(string);
            },

            /**
             * this method encrypts strings
             * @param secretKey a secret key with max len of 10 chars
             * @param secretString a string that should be enrypted
             * @returns base64 encoded encrypted string
             */
            encryptWithShortKey: function (secretKey, secretString) {
                var parameters = { cipher: "aes", ks: 256, iter: 4096 };

                if(typeof secretKey != 'string' || secretKey.length < 3){ //Todo! key sollte länger sein
                    cmLogger.warn('cmCrypt.encryptWithShortKey(): unable to encrypt, invalid key. '+secretKey)
                    return "";
                }


                if (null == secretString)
                    return "";

                var encryptedSecretString = sjcl.json.encrypt(String(secretKey), String(secretString), parameters);

                return encryptedSecretString;
            },

            /**
             * this method encrypts strings
             * @param secretKey a secret key with min len of 60 chars
             * @param secretString a string that should be encrypted
             * @returns base64 encoded encrypted string
             */
            encrypt: function (secretKey, secretString) {
                var parameters = {cipher: "aes", ks: 256, iter: 500 };

                if(typeof secretKey != 'string' || secretKey.length < 1){ //Todo: längere Keys verlangen
                    cmLogger.warn('cmCrypt.encrypt(): unable to encrypt, invalid key.'+secretKey)
                    return "";
                }

                if (null == secretString)
                    return "";

                if (secretKey.length < 60)
                    return "";


                var encryptedSecretString = sjcl.json.encrypt(String(secretKey), String(secretString), parameters);

                return encryptedSecretString;
            },
            /**
             * this method decrypts uuencoded strings
             * @param secretKey a secret key
             * @param secretString a base64 encoded string that should be decrypted
             * @returns decrypted string
             */
            decrypt: function (secretKey, secretString) {

                if(secretString != '' && typeof secretString == 'object'){
                    secretString = JSON.stringify(secretString)
                }

                if(typeof secretKey != 'string' || secretKey.length < 1){
                    return secretString;
                }

                if (null == secretString)
                    return false;

                var decryptedString;

                try {
                    decryptedString = sjcl.decrypt(secretKey, secretString)
                } catch (e) {
    //                    cmLogger.warn('Unable to decrypt.', e)
    //                    console.warn(e)
                }

                return decryptedString || false
            },

            /**
             * return the bit size of possible keygeneration
             * @returns {string[]}
             */
            getKeySizes: function(){
                return ['2048','4096'];
            },

            /**
             * start async process
             * @param keylen
             * @param $scopeState
             * @returns {Promise.promise|*|webdriver.promise.Deferred.promise}
             */
            generateAsyncKeypair: function(keySize, onGeneration){
                if (keySize == undefined ||
                    typeof keySize != 'number' ||
                    async.interval != null ) {
                    return false;
                }

                // Create the encryption object.
                var self = this,
                    time = -((new Date()).getTime()),
                    counts = 0;

                // init vars
                async.crypt = new JSEncrypt({default_key_size: keySize}),
                async.promise = $q.defer();
                async.interval = $interval(function(){
                    counts++;
                    if(typeof onGeneration == "function"){
                        onGeneration(counts, (time + ((new Date()).getTime())))
                    }
                }, 500);

                // start keypair generation
                async.crypt.getKey(function(){
                    var key = new self.Key(async.crypt);

                    // only resolve if keypair exists
                    if(key.getPrivateKey() == undefined)
                        return false;

                    self.cancelGeneration(true);
                    if(async.promise != null) {
                        async.promise.resolve({
                            timeElapsed: (time + ((new Date()).getTime())),
                            counts: counts,
                            key: key
                        });
                        // !!! important for unit test, don't remove !!!
                        $rootScope.$apply();
                    }
                });

                return async.promise.promise;
            },
            /**
             * cancel key generation process / simple clearInterval
             * if interval is pending
             * @returns {boolean}
             */
            cancelGeneration: function(withoutReject){
                if(async.interval != null){
                    // clear interval
                    $interval.cancel(async.interval);
                    async.interval = null;
                    // clear promise and library vars if param withReject is true
                    if(withoutReject == undefined) {
                        async.crypt.cancelAsync();
                        async.promise.reject();
                    }
                    return true;
                }
                return false;
            },

            generatePassword: function(length){
                var length = parseInt(length) || 10;
                var bad_random_passphrase ='';

                /**
                    TODO: check browser function
                    [934838069, 3149100522, 522808787, 1733751200, 863464034, 738885619]
                    try to this array hash this and take first chars!
                 */
//                var array = new Uint32Array(length);
//                window.crypto.getRandomValues(array);

                while(bad_random_passphrase.length < length){
                    bad_random_passphrase += Math.random().toString(36).replace('0.','')
                }

                return bad_random_passphrase.slice(-(length));
            },

            generatePassphrase: function(){
                var bad_random_passphrase ='';

                while(bad_random_passphrase.length < 60){
                    bad_random_passphrase += Math.random().toString(36).replace('0.','')
                }

                return bad_random_passphrase;
            },


            /**
             * generateTransactionSecret
             * @returns {String} transactionSecret
             */
            generateTransactionSecret: function(){
                return this.generatePassword(6);
            },

            /**
             * signOwnPubKey
             * @param _settings_
             * @returns {String} rsaSha256Signature of newPrivKey
             */
            sign: function(_settings_){
                var defaultSettings = {
                    identityId: 0, // identityId to signature
                    transactionSecret: '',
                    fromKey: undefined, // key with privkey from new device
                    toKey: undefined // key with pubkey from old device
                },
                dataForHandshake = {
                    signature: '',
                    encryptedTransactionSecret: '',
                    fromKeyId: 0,
                    toKeyId: 0
                },
                settings = angular.extend({},defaultSettings,_settings_),
                hashPubKey,
                signatory = new JSEncrypt();

                if(settings.fromKey == undefined){
                    cmLogger.error('sign fromKey isn\'t a cmKey');
                    return null;
                }
                if(settings.toKey == undefined){
                    cmLogger.error('sign toKey isn\'t a cmKey');
                    return null;
                }

                // set new privKey
                signatory.setPrivateKey(settings.fromKey.getPrivateKey());
                dataForHandshake.fromKeyId = settings.fromKey.id;
                // hash identityId and oldPubKey
                dataForHandshake.encryptedTransactionSecret = settings.toKey.encrypt(settings.transactionSecret);
                dataForHandshake.toKeyId = settings.toKey.id;
                // hash the transaction
                hashPubKey = sjcl.hash.sha256.hash(settings.identityId+':'+dataForHandshake.encryptedTransactionSecret).toString();
                // create signature with hash of above
                dataForHandshake.signature = signatory.sign(hashPubKey);
                // return that moep dataForHandshake
                return dataForHandshake;
            },

            /**
             * verifyOwnPubKey
             * @param _settings_
             * @returns {Boolean} is verification valid of newPubKey
             */
            verify: function(_settings_){
                var defaultSettings = {
                    identityId: '', // identityId to verify signature
                    fromKey: undefined, // pubkey from new device
                    encryptedTransactionSecret: '', // encrypted pubkey from old device with transactionSecret
                    signature: '' // signature of newPubKey
                },
                settings = angular.extend({},defaultSettings,_settings_),
                hashPubKey,
                verifier = new JSEncrypt();

                if(settings.fromKey == undefined){
                    cmLogger.error('sign fromKey isn\'t a cmKey');
                    return false;
                }

                // set new pubKey
                verifier.setPublicKey(settings.fromKey.getPublicKey());
                // hash pubkey
                hashPubKey = sjcl.hash.sha256.hash(settings.identityId+':'+settings.encryptedTransactionSecret).toString();
                // check verification
                return verifier.verify(hashPubKey, settings.signature, CryptoJS.SHA256);
            },

            isTransactionSecretValid: function(_settings_){
                var defaultSettings = {
                    userInput: '', //
                    toKey: undefined,
                    encryptedTransactionSecret: ''
                },
                settings = angular.extend({},defaultSettings,_settings_);

                return settings.toKey.decrypt(settings.encryptedTransactionSecret) == settings.userInput;
            }
        }
    }
]);