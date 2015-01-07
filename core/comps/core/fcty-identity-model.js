'use strict';

angular.module('cmCore')
.factory('cmIdentityModel',[
    'cmAuth', 'cmCrypt', 'cmKey', 'cmKeyFactory', 'cmObject', 'cmLogger', 'cmApi',
    'cmFileFactory', 'cmStateManagement', 'cmUtil', 'cmNotify',
    '$injector',
    function(cmAuth, cmCrypt, cmKey, cmKeyFactory, cmObject, cmLogger, cmApi,
             cmFileFactory, cmStateManagement, cmUtil, cmNotify,
             $injector){

        function Identity(identity_data){

            var self = this;

            cmObject.addEventHandlingTo(this);

            this.state  = new cmStateManagement(['new','decrypted','loading']);

            /**
             * Initialize Identity
             * @param {String|Object} data identity data for model
             * @returns {Message}
             */
            function init(data){
                self.clear();

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
                //cmLogger.debug('cmIdentityModel.importData', data);

                if(typeof data !== 'object'){
                    cmLogger.debug('cmIdentityModel:import:failed - no data!');
                    return this;
                }

                this.id                     = data.id           || this.id;
                this.displayName            = data.displayName  || this.displayName;
                this.userKey                = data.userKey      || this.userKey;
                this.cameoId                = data.cameoId      || this.cameoId;
                this.avatarId               = data.avatar       || this.avatarId;
                // TODO: hack for identity/edit update
                if(typeof data.email != 'string')
                    this.email              = data.email        || this.email;
                else
                    this.email              = {value:data.email};

                if(typeof data.phoneNumber != 'string')
                    this.phoneNumber        = data.phoneNumber  || this.phoneNumber;
                else
                    this.phoneNumber        = {value:data.phoneNumber};

                this.preferredMessageType   = data.preferredMessageType || this.preferredMessageType;
                this.userType               = data.userType             || this.userType;
                this.created                = data.created              || this.created;
                this.lastUpdated            = data.lastUpdated          || this.lastUpdated;
                this.isActive               = data.active               || this.isActive;

                data.publicKeys             = data.publicKeys           || [];

                data.publicKeys.forEach(function (publicKey_data) {
                    // first deleted event from BE
                    if('deleted' in publicKey_data && publicKey_data.deleted){
                        self.keys.deregister(publicKey_data);
                    } else {
                        var key =  self.keys.create(publicKey_data, true);

                        //check if the keyis working properly, if not, get rid of it:
                        if(!key.getPublicKey()){
                            self.keys.deregister(key)
                        }
                    }
                });

                this.state.unset('new');
                this.trigger('update:finished', this);

                return this;
            };

            this.exportData = function(){
                return {
                    id: this.id,
                    displayName: this.displayName,
                    userKey: this.userKey,
                    cameoId: this.cameoId,
                    avatarId: this.avatarId,
                    email: this.email,
                    phoneNumber: this.phoneNumber,
                    preferredMessageType: this.preferredMessageType,
                    userType: this.userType,
                    created: this.created,
                    lastUpdated: this.lastUpdated
                }
            };

            this.load = function(){
                if(typeof this.id == 'string'
                    && this.id.length > 0
                    && this.state.is('loading') === false) {

                    this.state.set('loading');

                    cmAuth.getIdentity(this.id).then(
                        function (import_data) {
                            if (typeof import_data == 'string') {
                                cmLogger.debug('cmAuth.getIdentity() should forward an object, got string instead. ')
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

            this.update = function(changes){
//                cmLogger.debug('cmIdentityModel.update');
                if(typeof changes == 'object' && cmUtil.objLen(changes) > 0){
                    cmAuth.updateIdentity(changes).then(
                        function(){
                            self.importData(changes);
                        },
                        function(){
                            cmNotify.warn('IDENTITY.NOTIFY.UPDATE.ERROR',{ttl:0})
                        }
                    )
                }

                return this;
            };

            this.clear = function(){
                //cmLogger.debug('cmIdentityModel.clear');

                this.id                     = undefined;
                this.displayName            = undefined;
                this.userKey                = undefined;
                this.cameoId                = undefined;
                this.avatarId               = undefined;
                this.avatar                 = undefined;
                this.email                  = { value: undefined, isVerified: undefined };
                this.phoneNumber            = { value: undefined, isVerified: undefined };
                this.preferredMessageType   = undefined;
                this.keys                   = this.keys ? this.keys.reset() : new cmKeyFactory();
                this.userType               = undefined;
                this.created                = undefined;
                this.lastUpdated            = undefined;
            };

            this.getDisplayName = function(){
                var cameoId = this.cameoId || '',
                    name = this.displayName || this.email.value || this.phoneNumber.value ||  cameoId.split("@")[0] || this.id;
                return name;
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

            this.removeKey = function(key){
                key.removeFromKeyList(self.keys);
                return this;
            };

            this.getWeakestKeySize = function(){
                cmLogger.debug('identityModle:getWeakestKeySize() is deprecated; please use keys.getWeakestKeySize().')
                return this.keys.getWeakestKeySize()
                // return this.keys.reduce(function(size, key){                    
                //     return size == undefined ? key.getSize() : Math.min(size, key.getSize())
                // }, undefined)

            };

            this.hasKeys = function(){
                return (this.keys.length > 0);
            };

            this.getTrustedKeys = function(){
                return $injector('cmUserModel').verifyIdentityKeys(this, true).then(
                    function(trusted_keys){
                        return trusted_keys;
                    }
                )
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

        $rootScope.$on('logout', function(){ self.reset() });

        $rootScope.$on('identity:switched', function(){ self.reset() });

        return self;
    }
]);