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
         
            random: function(size){
                //@Todo:
                
                cmLogger.warn('Bad random numbers.')
                return Math.random()

                /*
                if(!window.crypto)
                    cmLogger.warn('window.crypto not present!')

                var array = new Uint32Array(size)
                console.log(size)
                console.log(sjcl.codec.base64.fromBits(window.crypto.getRandomValues(array)))
                return  sjcl.codec.base64.fromBits(window.crypto.getRandomValues(array))//sjcl.codec.base64.fromBits(sjcl.random.randomWords(size));
                */
            },

            /**
             * this method calculates a secure hash
             * @param secretString String that should be hashed
             */
            
            hash: function (secretString) {
                if (typeof secretString != 'string' || secretString.length == 0)
                    throw "cmCrypt.hash(): invalid argument."

                return sjcl.codec.base64.fromBits(sjcl.hash.sha256.hash(secretString))
            },
            /**
             * [hashObject description]
             * @param  {[type]} obj         [description]
             * @param  {[type]} hash_method [description]
             * @return {[type]}             [description]
             */
            hashObject: function(obj){
                var visited = []

                function objectToArray(obj){

                    //console.log(visited.length)

                    if(visited.indexOf(obj) != -1)
                        throw "Error: cmCrypt.hashObject() unable to hash cyclic Objects."
                    

                    if(typeof obj == "string") return obj
                    if(typeof obj == "number") return obj.toString()
                        
                    if(["[object Object]", "[object Array]"].indexOf(Object.prototype.toString.call(obj)) == -1)
                        throw "Error: cmCrypt.hashObject() unable to hash Objects with values like " + Object.prototype.toString.call(obj) 

                    var keys    =   Object.keys(obj).sort()

                    visited.push(obj)

                    var values  =   keys.map(function(key){ return objectToArray(obj[key]) })

                    return [keys, values]
                }

                return this.hash(JSON.stringify(objectToArray(obj)))
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

                if (secretKey.length < 60){
                    cmLogger.debug("cmCrypt.encrypt(): key too short.")
                    return "";
                }


                var encryptedSecretString = sjcl.json.encrypt(String(secretKey), String(secretString), parameters);

                return encryptedSecretString;
            },
            /**
             * this method decrypts uuencoded strings
             * @param secretKey a secret key
             * @param secretString a base64 encoded string that should be decrypted
             * @returns decrypted string or false if unable to decrypt
             */
            decrypt: function (secretKey, secretString) {

                if(secretString != '' && typeof secretString == 'object'){
                    secretString = JSON.stringify(secretString)
                }

                if(typeof secretKey != 'string' || secretKey.length < 1){
                    return false;
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
                    typeof keySize != 'number') {
                    return false;
                }

                // Create the encryption object.
                var self = this,
                    time = -((new Date()).getTime()),
                    counts = 0;

                // init vars
                async.crypt = new JSEncrypt({default_key_size: keySize}),
                async.promise = $q.defer();

                // start keypair generation
                async.crypt.getKey(function(){

                    // only resolve if keypair exists
                    if(async.crypt.getPrivateKey() == undefined)
                        return false;

                    self.cancelGeneration(true);
                    if(async.promise != null) {
                        async.promise.resolve({
                            timeElapsed: (time + ((new Date()).getTime())),
                            counts: counts,
                            key: async.crypt
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
                if(async.crypt != null){
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
                    bad_random_passphrase += this.random().toString(36).replace('0.','')
                }

                return bad_random_passphrase.slice(bad_random_passphrase.length-length);
            },

            generatePassphrase: function(){
                var bad_random_passphrase ='';

                while(bad_random_passphrase.length < 60){
                    bad_random_passphrase += this.random().toString(36).replace('0.','')
                }

                return bad_random_passphrase;
            },



            //Todo check if te follwoing is still needed

            /**
             * generateTransactionSecret
             * @returns {String} transactionSecret
             */
            generateTransactionSecret: function(){
                return this.generatePassword(6);
            },

            /**
             * signAuthenticationRequest
             * @param _settings_
             * @returns {String} rsaSha256Signature of newPrivKey
             */
            signAuthenticationRequest: function(_settings_){
                var defaultSettings = {
                    identityId: 0,
                    transactionSecret: '',
                    fromKey: undefined,
                    toKey: undefined
                },
                dataForHandshake = {
                    signature: '',
                    encryptedTransactionSecret: '',
                    fromKeyId: 0,
                    fromKeyFingerprint: '',
                    toKeyId: 0,
                    toKeyFingerprint: ''
                },
                settings = angular.extend({},defaultSettings,_settings_);

                if(!(settings.fromKey instanceof cmKey)){
                    cmLogger.error('sign fromKey isn\'t a cmKey');
                    return null;
                }
                if(!(settings.toKey instanceof cmKey)){
                    cmLogger.error('sign toKey isn\'t a cmKey');
                    return null;
                }

                dataForHandshake.fromKeyId = settings.fromKey.id;
                dataForHandshake.fromKeyFingerprint = settings.fromKey.getFingerprint();

                dataForHandshake.toKeyId = settings.toKey.id;
                dataForHandshake.toKeyFingerprint = settings.toKey.getFingerprint();

                dataForHandshake.encryptedTransactionSecret = settings.toKey.encrypt(settings.transactionSecret);

                var signData = {
                    identityId :settings.identityId,
                    encryptedTransactionSecret: dataForHandshake.encryptedTransactionSecret
                };


                dataForHandshake.signature = settings.fromKey.sign(this.hashObject(signData));

                return dataForHandshake;
            },

            /**
             * verifyAuthenticationRequest
             * @param _settings_
             * @returns {Boolean} is verification valid of newPubKey
             */
            verifyAuthenticationRequest: function(_settings_){
                var defaultSettings = {
                        identityId: '',
                        fromKey: undefined,
                        encryptedTransactionSecret: '',
                        signature: ''
                    },
                    settings = angular.extend({},defaultSettings,_settings_);

                if(!(settings.fromKey instanceof cmKey)){
                    cmLogger.error('sign fromKey isn\'t a cmKey');
                    return false;
                }

                var verifyData = {
                    identityId: settings.identityId,
                    encryptedTransactionSecret: settings.encryptedTransactionSecret
                };

                return settings.fromKey.verify(this.hashObject(verifyData), settings.signature);
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