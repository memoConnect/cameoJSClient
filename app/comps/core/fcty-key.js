'use strict';

angular.module('cmCore').factory('cmKey',[
    function(){
        /**
         * @TODO TEsts!!!!!
         * @param data
         * @returns {*}
         */
        function cmKey(data){
            //Wrapper for RSA Keys
            var self = this,
                crypt

            if(typeof data == "object" && "updateKeyList" in data) return data //data is already a Key object

            if(
                typeof data == "object"
                && "getPublicKey"   in data
                && "getPrivateKey"  in data
                && "encrypt"        in data
                && "decrypt"        in data
            ){
                crypt = data    //data is already a JSEncrypt object
            }else{
                crypt = new JSEncrypt()
                crypt.setKey(data)
            }

            this.setId = function(id){
                this.id = id
                return this
            }

            this.setName = function(name){
                this.name = name
                return this
            }

            //set either public or private key
            this.setKey = function(key){
                crypt.setKey(key)
                return this
            }

            this.getPublicKey = function(){
                var public_key
                try{
                    public_key = crypt.getPublicKey()
                }catch(e){}

                return public_key
            }

            this.getPrivateKey = function(){
                var private_key
                try{
                    private_key = crypt.getPrivateKey()
                }catch(e){}

                return private_key
            }

            this.encrypt = function(secret){
                return crypt.encrypt(secret)
            }

            this.decrypt = function(encrypted_secret){
                return crypt.decrypt(encrypted_secret)
            }

            this.getSize = function(){
                var size

                try{
                    size = crypt.key.n.bitLength()
                }catch(e){}

                return size
            }

            this.exportData = function(){
                var data        = {},
                    private_key = this.getPrivateKey(),
                    public_key  = this.getPublicKey(),
                    size        = this.getSize()

                if(this.id)     data.id         = this.id
                if(this.name)   data.name       = this.name
                if(public_key)  data.pubKey     = public_key
                if(private_key) data.privKey    = private_key
                if(size)        data.size       = size

                return data
            }

            this.importData = function(data){
                var public_key = this.getPublicKey()

                data.pubKey = data.pubKey   ? data.pubKey.replace(/\n/g,'') : undefined
                public_key  = public_key    ? public_key.replace(/\n/g,'')  : undefined


                if(data.name)   this.setName(data.name)
                if(data.id)     this.setId(data.id)

                if( data.pubKey && (data.pubKey != public_key) ){
                    this.setKey(data.pubKey)
                }

                if( data.key && (data.key != public_key) ){
                    this.setKey(data.key)
                }

                if(data.privKey) this.setKey(data.privKey)

                return this
            }

            this.updateKeyList = function(key_list){
                var check = false

                key_list.forEach(function(key){
                    if(
                        (key.id && (key.id == self.id))
                        || key.getPublicKey() == self.getPublicKey()
                    ){
                        angular.extend(key, self)
                        check = true
                    }
                })

                if(!check) key_list.push(self)
            }

            this.updateKeyDataList = function(key_data_list){
                var check = false

                key_data_list.forEach(function(key_data){
                    if(
                        (key_data.id && (key_data.id == self.id))
                        || key_data.pubKey == self.getPublicKey()
                    ){
                        angular.extend(key_data, self.exportData())
                        check = true
                    }
                })



                if(!check) key_data_list.push(this.exportData())
            }
        };

        return cmKey;
    }
])