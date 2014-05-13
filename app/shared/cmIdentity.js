/**
 * Created by Empujador on 17.03.14.
 */
'use strict';

angular.module('cmIdentity', ['cmAuth', 'cmCrypt', 'cmObject','cmLogger','cmApi'])
.factory('cmIdentityModel',[
    'cmAuth',
    'cmCrypt',
    'cmObject',
    'cmLogger',
    'cmApi',
    '$q',
    function(cmAuth, cmCrypt, cmObject, cmLogger, cmApi, $q){
        var Identity = function(identity_data){

            this.id,
            this.displayName,
            this.userKey,
            this.cameoId,
            this.avatarId,
            this.avatar,
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
                console.log('keylist')
                console.dir(encrypted_key_list)
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

            /**
             * get and cached avatar of identity
             * @returns {promise}
             */
            this.getAvatar = function(){
                var defer = $q.defer();
                // get and cache avatar
                if(this.avatarId) {
                    if (this.avatar == undefined) {
                        cmApi.get({
                            path: "/file/"+this.avatarId+"/"+0,
                            exp_ok: 'chunk'
                        }).then(function(base64){
                            self.avatar = base64;
                            defer.resolve(base64);
                        });
                        // return cached avatar
                    } else {
                        defer.resolve(this.avatar);
                    }
                } else {
                    defer.reject();
                }
                return defer.promise;
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

                console.dir(self.keys)

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
                console.log('init identity')
                if(typeof identity_data === 'object'){
                    this.id = identity_data.id;
                    this.displayName            = identity_data.displayName
                    this.userKey                = identity_data.userKey
                    this.cameoId                = identity_data.cameoId
                    this.avatarId               = identity_data.avatar
                    this.email                  = identity_data.email
                    this.phoneNumber            = identity_data.phoneNumber
                    this.preferredMessageType   = identity_data.preferredMessageType
                    this.userType               = identity_data.userType
                    this.created                = identity_data.created
                    this.lastUpdated            = identity_data.lastUpdated
                    this.keys                   = []

                    identity_data.publicKeys = identity_data.publicKeys || []
                    identity_data.publicKeys.forEach(function(publicKey_data){
                        console.log('add key')
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
    }
])
.factory('cmIdentityFactory',[
    '$rootScope',
    'cmIdentityModel',
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
            create: function(data){
                var identity = null,
                    i = 0;

                    if(this.getQty() > 0){
                        if(typeof data === 'string'){
                            while(i < instances.length){
                                if(typeof instances[i] === 'object' && instances[i].id == data){
                                    identity = instances[i];
                                    break;
                                }
                                i++;
                            }
                        } else if(typeof data === 'object'){
                            while(i < instances.length){
                                if(typeof instances[i] === 'object' && instances[i].id == data.id){
                                    identity = instances[i];
                                    break;
                                }
                                i++;
                            }
                        }
                    }

                    if(identity === null){
                        identity = new cmIdentityModel(data);

                        instances.push(identity);
                    }

                return identity;
            },
            getQty: function(){
                return instances.length;
            }
        }
    }
]);