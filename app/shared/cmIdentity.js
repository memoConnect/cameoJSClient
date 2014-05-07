/**
 * Created by Empujador on 17.03.14.
 */
'use strict';

angular.module('cmIdentity', ['cmAuth', 'cmCrypt', 'cmObject','cmLogger'])
.factory('cmIdentityModel',[
'cmAuth', 'cmCrypt', 'cmObject', 'cmLogger',
function(cmAuth, cmCrypt, cmObject, cmLogger){
    var Identity = function(identity_data){

        this.id,
        this.displayName,
        this.userKey,
        this.cameoId,
        this.email                   = { value: undefined, isVerified: undefined },
        this.phoneNumber             = { value: undefined, isVerified: undefined },
        this.preferredMessageType,
        this.keys                    = [],         
        this.userType,
        this.created,
        this.lastUpdated;

        var self = this;

        cmObject.addEventHandlingTo(this)

        //Encrypt passphrase with all available public keys
        //Identities cannot decrypt, Users can
        this.encryptPassphrase = function(passphrase){
            var encrypted_key_list = []

            this.keys.forEach(function(key){

                var key_2 = new cmCrypt.Key()

                key_2.setKey(key.getPrivateKey())
               
                var encrypted_passphrase = key.encrypt(passphrase)
                
                encrypted_key_list.push({
                    keyId:                 key.id,
                    encryptedPassphrase:   encrypted_passphrase   
                })
            }) 

            return encrypted_key_list
        }

        this.getDisplayName = function(){
            return this.displayName || this.cameoId || this.id;
        };

        /* do we need this?
        this.getKeyById = function(id){
            var needle

            this.keys.forEach(function(key){
                if(key.id == id) needle = key
            })

            return needle
        }

        */

        this.getAvatar = function(mock){
            var avatar = ''; // api returns image src
            if(mock != undefined)
                return mock;
            return avatar;
        };

        this.addKey = function(key_data){
            //key_data maybe a string containing a public or Private key, or a key Object (cmCrypt.Key)            

            var key,
                is_object  = (typeof key_data == 'object'),
                is_string  = (typeof key_data == 'string'),
                can_update = is_object && "updateKeyList" in key_data

            if( can_update )                key = key_data  //already a Key object
            if( is_object && !can_update)   key = (new cmCrypt.Key()).importData(key_data) //from backend or localstorgae
            if( is_string)                  key = new cmCrypt.Key(key_data) //plain text public or private key          

            key 
            ?   key.updateKeyList(self.keys) 
            :   cmLogger.error('uanable to add key, unknown format: '+key_data)              

            return this
        }

        this.getWeakestKeySize = function(){
            var size = undefined
            this.keys.forEach(function(key){
                size = size !=undefined ? Math.min(size, key.getSize()) : key.getSize()
            })
            size = size || 0
            return size
        }

        /**
         * @param identity_data
         */
        this.init = function(identity_data){
            if(typeof identity_data === 'object'){
                this.id = identity_data.id;
                this.displayName            = identity_data.displayName
                this.userKey                = identity_data.userKey
                this.cameoId                = identity_data.cameoId
                this.email                  = identity_data.email
                this.phoneNumber            = identity_data.phoneNumber
                this.preferredMessageType   = identity_data.preferredMessageType                                
                this.userType               = identity_data.userType
                this.created                = identity_data.created
                this.lastUpdated            = identity_data.lastUpdated 
                this.keys                   = []

                identity_data.publicKeys = identity_data.publicKeys || []
                identity_data.publicKeys.forEach(function(publicKey_data){                      
                    self.addKey(publicKey_data)
                })

                this.trigger('init:finish', this);

            } else if(typeof identity_data === 'string'){
                this.id = identity_data;

                this.trigger('before-load')
                cmAuth.getIdentity(identity_data).then(
                    function(data){
                        self.trigger('load', data)
                        if(typeof data =='string'){
                            cmLogger('cmAuth.getIdentity() should forward an object, got string instead. ')
                        }else{
                            self.init(data)    
                        }
                        self.trigger('after-load', data)
                    }
                )
            }

            return this;
        }

        this.init(identity_data);
    }

    return Identity;
}])
.factory('cmIdentityFactory',[
'$rootScope','cmIdentityModel',
function($rootScope, cmIdentityModel){
    var instances = [];

    $rootScope.$on('logout', function(){
        instances = [];
    });

    return {
        /**
         * returns instance of cmIdentityModel
         * @param data id or object
         * @returns {*}
         */

        get: function(data){
            var identity = null,
                id       = data.id || data

            identity = this.getById(id) 

            if(identity === null){
                identity = new cmIdentityModel(data);
                instances.push(identity);
            }

            return identity;
        },

        create: function(data){
            if(typeof data != 'object'){
                return null  
            } else {
                return this.get(data)
            }
        },


        //get Message by id
        getById: function(id){
            var identity = null;

            for(var i = 0; i < instances.length; i++){
                if(
                    typeof instances[i] === 'object' &&
                    instances[i].id == id
                ){
                    identity = instances[i];
                    break;
                }
            }

            return identity
        },


        getQty: function(){
            return instances.length;
        }
    }
}]);