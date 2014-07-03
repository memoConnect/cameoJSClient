'use strict';

angular.module('cmCore').factory('cmIdentityModel',[
    'cmAuth',
    'cmCrypt',
    'cmObject',
    'cmLogger',
    'cmApi',
    'cmFileFactory',
    'cmStateManagement',
    'cmUtil',
    function(cmAuth, cmCrypt, cmObject, cmLogger, cmApi, cmFileFactory, cmStateManagement, cmUtil){

        function Identity(identity_data){

            this.id = undefined;
            this.displayName = undefined;
            this.userKey = undefined;
            this.cameoId = undefined;
            this.avatarId = undefined;
            this.avatar = undefined;
            this.email                   = { value: undefined, isVerified: undefined };
            this.phoneNumber             = { value: undefined, isVerified: undefined };
            this.preferredMessageType = undefined;
            this.keys                    = [];
            this.userType = undefined;
            this.created = undefined;
            this.lastUpdated = undefined;

            var self = this;

            cmObject.addEventHandlingTo(this);

            this.state = new cmStateManagement(['new','decrypted','loading']);

            /**
             * Initialize Identity
             * @param {String|Object} data identity data for model
             * @returns {Message}
             */
            function init(data){
                if(typeof data == 'string' && data.length > 0){
                    self.id = data;
                    self.load();
                } else if(typeof data == 'object' && ('id' in data)){
                    self.id = data.id;

                    if(cmUtil.objLen(data) < 2){
                        self.load();
                    } else {
                        self.importData(data);
                    }
                } else {
                    self.state.set('new');
                }

                self.trigger('init:finished');
            }

            /**
             * @param identity_data
             */
            this.importData = function(data){
                if(typeof data !== 'object'){
                    cmLogger.debug('cmIdentityModel:import:failed - no data!');
                    return this;
                }

                this.id                     = data.id || this.id;
                this.displayName            = data.displayName || this.displayName;
                this.userKey                = data.userKey || this.userKey;
                this.cameoId                = data.cameoId || this.cameoId;
                this.avatarId               = data.avatar || this.avatarId;
                this.email                  = data.email || this.email;
                this.phoneNumber            = data.phoneNumber || this.phoneNumber;
                this.preferredMessageType   = data.preferredMessageType || this.preferredMessageType;
                this.userType               = data.userType || this.userType;
                this.created                = data.created || this.created;
                this.lastUpdated            = data.lastUpdated || this.lastUpdated;
                this.keys                   = [];

                data.publicKeys = data.publicKeys || [];

                data.publicKeys.forEach(function(publicKey_data){
                    self.addKey(publicKey_data);
                });

                this.state.unset('new');
                this.trigger('update:finished', this);

                return this;
            };

            this.load = function(){
                if(typeof this.id == 'string'
                    && this.id.length > 0
                    && this.state.is('loading') === false) {

                    this.state.set('loading');

                    cmAuth.getIdentity(this.id).then(
                        function (import_data) {
                            if (typeof import_data == 'string') {
                                cmLogger('cmAuth.getIdentity() should forward an object, got string instead. ')
                            } else {
                                self.importData(import_data);
                            }
                            self.state.unset('loading');
                        },
                        function(){
                            self.state.unset('loading');
                            self.trigger('load:failed');
                        }
                    );
                } else {
                    cmLogger.debug('cmIdentityModel:load:failed - no identityId');
                    this.trigger('load:failed');
                }

                return this;
            };

            this.clear = function(){
                cmLogger.debug('cmIdentityModel.clear');
                this.id = undefined;
                this.displayName = undefined;
                this.userKey = undefined;
                this.cameoId = undefined;
                this.avatarId = undefined;
                this.avatar = undefined;
                this.email                   = { value: undefined, isVerified: undefined };
                this.phoneNumber             = { value: undefined, isVerified: undefined };
                this.preferredMessageType = undefined;
                this.keys                    = [];
                this.userType = undefined;
                this.created = undefined;
                this.lastUpdated = undefined;
            };

            //Encrypt passphrase with all available public keys
            //Identities cannot decrypt, Users can
            this.encryptPassphrase = function(passphrase, whiteList){
                var encrypted_key_list = [];

                this.keys.forEach(function(key){
                    if(typeof whiteList != 'object' || whiteList.indexOf(key.id) != -1){
                        var key_2 = new cmCrypt.Key();

                        key_2.setKey(key.getPrivateKey());

                        var encrypted_passphrase = key.encrypt(passphrase);

                        if(encrypted_passphrase){
                            encrypted_key_list.push({
                                keyId:                 key.id,
                                encryptedPassphrase:   encrypted_passphrase
                            });
                        }else{
                            cmLogger.debug('cmIdentity: unable to encrypt passphrase.')
                        }
                    }
                });

                return encrypted_key_list;
            };

            this.getDisplayName = function(){
                return this.displayName || this.cameoId || this.id;
            };

            /**
             * get and cached avatar of identity
             *
             */
            this.getAvatar = function(){
                if(this.avatarId){
                    var file = cmFileFactory.create(this.avatarId);
                        file.downloadStart();

                    return file;
                }
                return false;
            };

            this.addKey = function(key_data){
                //key_data maybe a string containing a public or Private key, or a key Object (cmCrypt.Key)

                var key,
                    is_object  = (typeof key_data == 'object'),
                    is_string  = (typeof key_data == 'string'),
                    can_update = is_object && "updateKeyList" in key_data

                if( can_update )                key = key_data;  //already a Key object
                if( is_object && !can_update)   key = (new cmCrypt.Key()).importData(key_data); //from backend or localstorgae
                if( is_string)                  key = new cmCrypt.Key(key_data); //plain text public or private key

                key
                ?   key.updateKeyList(self.keys)
                :   cmLogger.error('uanable to add key, unknown format: '+key_data);

                return this;
            };

            this.getWeakestKeySize = function(){
                var size = undefined;
                this.keys.forEach(function(key){
                    size = size != undefined ? Math.min(size, key.getSize()) : key.getSize();
                });
                size = size || 0;
                return size;
            };

            this.hasKeys = function(){
                return (this.keys.length > 0);
            };

            init(identity_data);
        }

        return Identity;
    }
])
.factory('cmIdentityFactory',[
    '$rootScope',
    'cmFactory',
    'cmIdentityModel',
    function($rootScope, cmFactory, cmIdentityModel){

        var self = new cmFactory(cmIdentityModel);

        self.clear = function(args){
            var id = typeof args == 'object' && 'id' in args
                ?   args.id
                :   args;

            var instance = self.find(id);

            if(instance !== null && typeof instance.clear == 'function'){
                instance.clear();
            }

            return self;
        };

        $rootScope.$on('logout', function(){
            self.reset()
        });

        return self;
    }
]);