'use strict';

angular.module('cmCore')
.factory('cmKey', [

    'cmLogger',

    function(cmLogger){
        /**
         * @TODO TEsts!!!!!
         * @param args
         * @returns {*}
         */
        function cmKey(data){
            //Wrapper for RSA Keys
            var self    = this,
                crypt   = undefined // will be JSEncrypt() once a key is set

            this.created    = 0;
            this.signatures = []

            function init(data){
                self.importData(data)
            }  

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


            this.getFingerprint = function(){
                return sjcl.codec.base64.fromBits(sjcl.hash.sha256.hash(this.getPublicKey()))
            }


            //in getFingerprint verwurstet
            this.getPublicKeyForSigning = function(identityId){
                if(typeof identityId == 'string' && identityId.length > 0){
                    return sjcl.hash.sha256.hash(identityId+':'+this.getPublicKey()).toString();
                } else {
                    cmLogger.debug('cmKey.getPublicKeyForSigning - Fail! - Empty identityId!');
                }

                return false;
            }

            this.getPrivateKey = function(){
                var private_key;
                try{
                    private_key = crypt.getPrivateKey();
                }catch(e){}

                return private_key;
            };

            this.signKey = function(key){
                return crypt && crypt.sign(key.getFingerprint())
            };

            this.encrypt = function(secret){
                return crypt && crypt.encrypt(secret);
            };

            this.decrypt = function(encrypted_secret){
                return crypt && crypt.decrypt(encrypted_secret);
            };

            this.trusts = function(key){
                return  this == key //allways trusts itself
                        ||
                        key.signatures.some(function(signature){
                            return      crypt
                                    &&  (self.id == signature.keyId) 
                                    &&  crypt.verify(key.getFingerprint(), signature.content, function(x){ return x })
                        })
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

            init(data)
        }

        return cmKey;
    }
])
