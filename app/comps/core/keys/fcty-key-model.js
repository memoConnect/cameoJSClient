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

            this.getPrivateKey = function(){
                var private_key;
                try{
                    private_key = crypt.getPrivateKey();
                }catch(e){}

                return private_key;
            };

            this.sign = function(value){
                return crypt.sign(value)
            }

            this.encrypt = function(secret){
                return crypt && crypt.encrypt(secret);
            };

            this.decrypt = function(encrypted_secret){
                return crypt && crypt.decrypt(encrypted_secret);
            };

            this.verify = function(signature){
                return crypt && crypt.verify(signature)
            };

            this.trusts = function(key){
                return  this == key //allways trusts itself
                        ||
                        this.signatures.some(function(signature){
                            return (key.id == signature.keyId) && key.verify(signature.content)
                        })
            };

            this.getSize = function(){
                var size;

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
                if(data.signatures) this.signatures.concat(data.signatures)

                if(key) this.setKey(key);

                return this;
            };

            this.exportData = function(){
                var data        = {},
                    private_key = this.getPrivateKey(),
                    public_key  = this.getPublicKey(),
                    size        = this.getSize();

                if(this.id)     data.id         = this.id;
                if(this.name)   data.name       = this.name;
                if(this.created)data.created    = this.created;
                if(public_key)  data.pubKey     = public_key;
                if(private_key) data.privKey    = private_key;
                if(size)        data.size       = size;

                return data;
            };

            this.updateKeyList = function(key_list){
                var check = false;

                key_list.forEach(function(key){
                    if(
                            (key.id && (key.id == self.id))
                        ||  key.getPublicKey() == self.getPublicKey()
                    ){
                        
                        key.importData(self.exportData())
                        check = true;
                    }
                });
                

                if(!check)
                    key_list.push(self);
            };

            this.removeFromKeyList = function(key_list){
                var index = key_list.indexOf(self);
                key_list.splice(index,1);
            };

            this.updateKeyDataList = function(key_data_list){
                var check = false;

                key_data_list.forEach(function(key_data){
                    if(
                        (key_data.id && (key_data.id == self.id))
                        || key_data.pubKey == self.getPublicKey()
                    ){
                        angular.extend(key_data, self.exportData());
                        check = true;
                    }
                });

                if(!check)
                    key_data_list.push(self.exportData());
            };

            init(data)
        }

        return cmKey;
    }
])
