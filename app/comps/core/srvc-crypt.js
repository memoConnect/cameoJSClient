'use strict';

angular.module('cmCore').service('cmCrypt',[
    'cmLogger',
    'cmKey',
    '$q',
    '$rootScope',
    function (cmLogger,cmKey, $q, $rootScope) {
        // private vars
        var async = {
            interval: null,
            promise: null,
            crypt: null
        };

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

                if(secretKey == '' || secretKey == undefined ){
                    return secretString;
                }

                if (null == secretString)
                    return "";
                if (secretKey.length > 10)
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

                if(secretKey == '' || secretKey == undefined){
                    return secretString;
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

                if(secretKey == '' || secretKey == undefined){
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
             * @Todo Aufräumen
             * now cmKey
             */
            Key: cmKey,
//            Key : function (data){
//                //Wrapper for RSA Keys
//                var self = this,
//                    crypt
//
//                if(typeof data == "object" && "updateKeyList" in data) return data //data is already a Key object
//
//                if(
//                       typeof data == "object"
//                    && "getPublicKey"   in data
//                    && "getPrivateKey"  in data
//                    && "encrypt"        in data
//                    && "decrypt"        in data
//                ){
//                    crypt = data    //data is already a JSEncrypt object
//                }else{
//                    crypt = new JSEncrypt()
//                    crypt.setKey(data)
//                }
//
//                this.setId = function(id){
//                    this.id = id
//                    return this
//                }
//
//                this.setName = function(name){
//                    this.name = name
//                    return this
//                }
//
//                //set either public or private key
//                this.setKey = function(key){
//                    crypt.setKey(key)
//                    return this
//                }
//
//                this.getPublicKey = function(){
//                    var public_key
//                    try{
//                        public_key = crypt.getPublicKey()
//                    }catch(e){}
//
//                    return public_key
//                }
//
//                this.getPrivateKey = function(){
//                    var private_key
//                    try{
//                        private_key = crypt.getPrivateKey()
//                    }catch(e){}
//
//                    return private_key
//                }
//
//                this.encrypt = function(secret){
//                    return crypt.encrypt(secret)
//                }
//
//                this.decrypt = function(encrypted_secret){
//                    return crypt.decrypt(encrypted_secret)
//                }
//
//                this.getSize = function(){
//                    var size
//
//                    try{
//                        size = crypt.key.n.bitLength()
//                    }catch(e){}
//
//                    return size
//                }
//
//                this.exportData = function(){
//                    var data        = {},
//                        private_key = this.getPrivateKey(),
//                        public_key  = this.getPublicKey(),
//                        size        = this.getSize()
//
//                    if(this.id)     data.id         = this.id
//                    if(this.name)   data.name       = this.name
//                    if(public_key)  data.pubKey     = public_key
//                    if(private_key) data.privKey    = private_key
//                    if(size)        data.size       = size
//
//                    return data
//                }
//
//                this.importData = function(data){
//                    var public_key = this.getPublicKey()
//
//                    data.pubKey = data.pubKey   ? data.pubKey.replace(/\n/g,'') : undefined
//                    public_key  = public_key    ? public_key.replace(/\n/g,'')  : undefined
//
//
//                    if(data.name)   this.setName(data.name)
//                    if(data.id)     this.setId(data.id)
//
//                    if( data.pubKey && (data.pubKey != public_key) ){
//                        this.setKey(data.pubKey)
//                    }
//
//                    if( data.key && (data.key != public_key) ){
//                        this.setKey(data.key)
//                    }
//
//                    if(data.privKey) this.setKey(data.privKey)
//
//                    return this
//                }
//
//                this.updateKeyList = function(key_list){
//                    var check = false
//
//                    key_list.forEach(function(key){
//                        if(
//                               (key.id && (key.id == self.id))
//                            || key.getPublicKey() == self.getPublicKey()
//                        ){
//                            angular.extend(key, self)
//                            check = true
//                        }
//                    })
//
//                    if(!check) key_list.push(self)
//                }
//
//                this.updateKeyDataList = function(key_data_list){
//                    var check = false
//
//                    key_data_list.forEach(function(key_data){
//                        if(
//                               (key_data.id && (key_data.id == self.id))
//                            || key_data.pubKey == self.getPublicKey()
//                        ){
//                            angular.extend(key_data, self.exportData())
//                            check = true
//                        }
//                    })
//
//
//
//                    if(!check) key_data_list.push(this.exportData())
//                }
//            },

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
                        key : new self.Key(async.crypt)
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

            generatePassphrase: function(){
                var bad_random_passphrase = _Base64.encode((Math.random()*(new Date()).getTime()).toString())
                return bad_random_passphrase.slice(bad_random_passphrase.length-10, bad_random_passphrase.length)
            }
        }
    }]
);