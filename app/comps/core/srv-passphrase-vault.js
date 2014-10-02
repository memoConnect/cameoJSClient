'use strict';

/**
 * @ngdoc object
 * @name cmPassphrase
 * @description
 * Handle Passphrase Conversation
 *
 * @requires cmFactory
 * @requires cmUserModel
 * @requires cmCrypt
 * @requires cmObject
 * @requires cmLogger
 */
angular.module('cmCore').factory('cmPassphraseVault',[
    'cmKeyFactory',

    function(cmKeyFactory){


        /**
         * @ngdoc method
         * @methodOf cmPassphraseVault
         *
         * @name couldBeAPassword
         * @description
         * private function to check minimal requirements for a password.
         *
         * @param {String} pw Anything to be checked wether it could be a password.
         * @return {Boolean} result Wheter the suggested password seems okay or not
         */
        function couldBeAPassword(pw){
            return ((typeof pw == "string") && pw.length >= 1); //Todo, require better passwords.
        }



        /**
         * @ngdoc method
         * @methodOf cmPassphraseVault
         *
         * @name couldBeAPassphrase
         * @description  private function to check minimal requirements for a passphrase.
         *
         * @param {String} pp Anything to be checked wether it could be a passphrase.
         * @return {Boolean} Wheater the suggested passphrase seems okay or not
         */
        function couldBeAPassphrase(pp){
            return ((typeof pp == "string") && (pp.length >= 60))
        }



        /**
         * Model
         */
        function PassphraseVault(data){

            var sePassphrase        = data.sePassphrase
                aePassphraseList    = data.aePassphraseList,


            this.getPassphrase = function(password){
                return $q.resolve()
            }

            this.getKeyTransmission = function(){
                return ''
            }

            this.exportData = function(){
                return $q.resolve()
            }
        }


        this.import = function(data){

            data =  {
                        sePassphrase:       data.sePassphrase       || null
                        aePassphraseList:   data.aePassphraseList   || []
                    }

            return new PassphraseVault(data)
        }


        this.encryptPassphrase = function(config){
            config =    {
                            passphrase: config.passphrase   || null,
                            password:   config.password     || null,
                            keys:       config.keys         || new cmKeyFactory()
                        }

            //Todo: encrypt

            return this.import(data)
        }



        function cmPassphrase(){
            var self            = this,
                password        = undefined,
                identities      = undefined,
                disabled        = false,
                asymmetricallyEncryptedPassphrases  = [],
                symmetricallyEncryptedPassphrase    = undefined;

            cmObject.addEventHandlingTo(this);

            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name importAsymmetricalEncryptedPassphrases
             * @description
             * Imports a list of asymmetrically encrypted passphrases as received from the API
             *             *
             * @param {Array} list A list of encrypted passphrase as received from the API
             * @returns {cmPassphrase} this cmPassphraseList
             */
            this.importAsymmetricallyEncryptedPassphrase = function(list){
                //if the parameter is not an array, treat it as an empty array:
                list = (typeof list == 'object' && list.length > 0) ? list : []

                list.forEach(function(item){
                    var duplicate =     asymmetricallyEncryptedPassphrases.filter(function(already_present_item){
                                            return already_present_item.keyId == item.keyId
                                                    //&& already_present_item.encryptedPassphrase == item.encryptedPassphrase
                                        }).length > 0
                    if(!duplicate)
                        asymmetricallyEncryptedPassphrases.push(item)
                })                

                return this;
            };

            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name importSymmetricallyEncryptedPassphrase
             * @description
             * Imports a symmetrically encrypted passphrase as received from the API
             * 
             * @param {String} encrypted_passphrase A list of encrypted passphrase as received from the API
             * @returns {cmPassphrase} this cmPassphrase
             */
            this.importSymmetricallyEncryptedPassphrase = function(encrypted_passphrase){
                symmetricallyEncryptedPassphrase = encrypted_passphrase    

                /*
                TODO: rethink
                
                if(typeof encrypted_passphrase == 'string' && encrypted_passphrase.length > 0){
                    
                }else{
//                    cmLogger.debug('cmPassphrase: importSymmetricallyEncryptedPassphrase(): unable to read encrypted passphrase.')
                }
                 */
                
                return this;
            };

            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name couldBeAPassword
             * @description
             * private function to check minimal requirements for a password.
             *
             * @param {String} pw Anything to be checked wether it could be a password.
             * @return {Boolean} result Wheter the suggested password seems okay or not
             */
            function couldBeAPassword(pw){
                return ((typeof pw == "string") && pw.length >= 1); //Todo, require better passwords.
            }

            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name couldBeAPassphrase
             * @description  private function to check minimal requirements for a passphrase.
             *
             * @param {String} pp Anything to be checked wether it could be a passphrase.
             * @return {Boolean} Wheater the suggested passphrase seems okay or not
             */
            function couldBeAPassphrase(pp){
                return ((typeof pp == "string") && (pp.length >= 60))
            }

            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name setPassword
             * @description
             * stores password for later use
             *
             * @param {String} pw The password to be stored
             * @returns {cmPassphrase|Boolean} this Returns cmPassphrase Object
             */
            this.setPassword = function(pw){
                password = pw;
                return this;
            };

            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name setIdentities
             * @description
             * stores identities with keys for later use
             *
             * @param {Array} idts The identities to be stored
             * @returns {cmPassphrase} this Returns cmPassphrase Object
             */
            this.setIdentities = function(idts){                
                identities = idts;
                
                return this
            };

            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name resetPassword
             * @description
             * resets password thus disabling symmetrical passphrase encryption
             *
             * @returns {Object} this Returns cmPassphrase Object
             */
            this.resetPassword = function(){                
                password = undefined;
                return this
            };

                        /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name resetPassword
             * @description
             * resets password thus disabling symmetrical passphrase encryption
             *
             * @returns {Object} this Returns cmPassphrase Object
             */
            this.resetPassword = function(){                
                password = undefined;
                return this
            };

            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name generate
             * @description
             * Generates a passphrase; useful only for first time encryption
             *
             * @todo Passphrase generation crappy!!
             */
            this.generate = function(){  
                return this.encrypt(cmCrypt.generatePassphrase())
            };


            /**
             * @ngdoc mehtod
             * @methodOf cmPassphrase
             *
             * @name decryptSymmetricallyEncryptedPassphrase (private)
             * 
             * @param {String} pw A password to decrypt with
             * @return {Boolean} Returns whether the decryption was a success or not.
             */
            function decryptSymmetricallyEncryptedPassphrase(){
                if(!couldBeAPassword(password) || !symmetricallyEncryptedPassphrase) 
                    return $q.reject()

                return  cmCrypt.decrypt(password, cmCrypt.base64Decode(symmetricallyEncryptedPassphrase))
                        .then(function(passphrase){
                            return  couldBeAPassphrase(passphrase)
                                    ?   $q.resolve(passphrase)
                                    :   $q.reject()
                        }) 
            }

            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name decryptAsymmetricallyEncryptedPassphrase
             * @description
             * Decrypts the encrypted passphrase list into a passphrase ready to be delivered by .get()
             *
             * @param {cmUserModel} user User providing keys for encryption.
             * @returns {Boolean} Returns wether the decryption was a success or not.
             */
            function decryptAsymmetricallyEncryptedPassphrase() {
                return  asymmetricallyEncryptedPassphrases
                        .reduce(function (ongoing, item) {
                            return  ongoing
                                    .catch(function(){
                                        return cmUserModel.decryptPassphrase(item.encryptedPassphrase, item.keyId)
                                    })
                        }, $q.reject())
                        .then(function(new_passphrase){
                            return  couldBeAPassphrase(new_passphrase)
                                    ?   $q.resolve(new_passphrase)
                                    :   $q.reject()
                        })
            }

            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name get
             * @description 
             * Deliver passphrase encrypted in the previously imported data.
             * 
             * @return {String|Boolean} Returns a primise resolving with the  passphrase encrypted in the previously imported data.
             */
            this.get = function(){                
                // try to decrypt with a password if available:
                return  decryptSymmetricallyEncryptedPassphrase()
                        .catch(function(){
                            return decryptAsymmetricallyEncryptedPassphrase()
                        })
            };

            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name symmetricallyEncryptPassphrase
             * @description 
             * Symmetrically encrypted previously provided passphrase with a password.
             * 
             * @param {String} pw The password to encrypt with
             * @return {String|Boolean} Returns a string if successful or false if not.
             */
            function symmetricallyEncrypt(passphrase, pw){
                if(couldBeAPassword(pw) && couldBeAPassphrase(passphrase)){
                    return cmCrypt.base64Encode(cmCrypt.encryptWithShortKey(password, passphrase));
                } else {
//                    cmLogger.debug('cmPassphrase:symmetricallyEncryptPassphrase - provide a proper password and and passphrase before encrypting the passphrase!');
                    return false                   
                }
            }

            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name asymmetricallyEncryptPassphrase
             * @description 
             * Symmetrically encrypted previously provided passphrase with a password.
             * 
             * @param {Array} identities Array of identities to encrypt the passphrase for.
             * @return {Array|Boolean}  Returns Array of encrypted passphrases if successfull or false if not.
             */
            function asymmetricallyEncrypt(passphrase, identities, keyList){
                if(couldBeAPassphrase(passphrase) && typeof identities == 'object' && identities.length > 0){
                    return  identities.reduce(function(list, identity){
                                return list.concat(identity.encryptPassphrase(passphrase, keyList))
                            }, [])
                } else{
//                    cmLogger.debug('cmPassphrase:asymmetricallyEncryptPassphrase - provide a list of identities and and passphrase before encrypting the passphrase!');
                    return false
                }
            }

            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name encrypt
             * @description
             * Encrypts the passphrase with all available means.
             */
            this.encrypt = function(passphrase){
                var passphrase_ready =  passphrase
                                        ?   $q.when(passphrase)
                                        :   this.decrypt()

                return  passphrase_ready
                        .then(function(passphrase){
                            var sym     = symmetricallyEncrypt(passphrase, password),
                                asym    = asymmetricallyEncrypt(passphrase, identities);

                            self.importSymmetricallyEncryptedPassphrase(sym);
                            self.importAsymmetricallyEncryptedPassphrase(asym);

                            return passphrase
                        })

            };

            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name exportData
             * @description
             * Deliver an object with the passphrase encrypted with available means ready to be submitted to the API.
             *
             * @return {Object} returns an encrypted passphrase list ready to be submitted to the API.
             */
            this.exportData = function(){                
                return  this.encrypt()
                        .then(function(){
                            return  {
                                        sePassphrase        : symmetricallyEncryptedPassphrase,
                                        aePassphraseList    : asymmetricallyEncryptedPassphrases,
                                        keyTransmission     : this.getKeyTransmission()
                                    }
                        })
            };

            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name exportMissingPassphraseList
             * @description
             * Deliver an object with the encrypted passphrases ready to be submitted to the API.
             *
             * @return {Object} returns an encrypted passphrase list ready to be submitted to the API.
             */
            this.exportMissingPassphraseList = function(keyList){
                return asymmetricallyEncryptPassphrase(identities, keyList);
            };

            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name disabled
             * @description 
             * Checks wether Encryption is enabled. encryption is considered to be enabled if this.passphrase is anything different from null.
             * If this.passphrase is neither null nor a string of appropriate length something is incoherent. Messages should not be sent in this case.
             * @return {Boolean} Returns whether the encryption is enabled
             */
            this.disabled = function(){
                return disbled;
            };

            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name  disable
             * @description 
             * Disables passphrase functionaliy (that is encryption wont work)
             * 
             * @return {cmPassphrase} this Returns itself for chaining.
             */
            this.disable = function(){
                disable = true;
                return this;
            };

            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name  disable
             * @description 
             * Disables passphrase functionaliy (that is encryption wont work)
             * 
             * @return {cmPassphrase} this Returns itself for chaining.
             */
            this.enable = function(){
                disable = false;
                return this;
            };


            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name getKeyTransmission
             * @description
             * return encryption type
             *
             * @returns {String} encryption type - 'none' || 'symmetric' || 'asymmetric' || 'mixed'
             */
            this.getKeyTransmission = function(){
                if(symmetricallyEncryptedPassphrase && asymmetricallyEncryptedPassphrases.length > 0)
                    return 'mixed';

                if(symmetricallyEncryptedPassphrase)                                        
                    return 'symmetric';

                if(asymmetricallyEncryptedPassphrases.length > 0 ) 
                    return 'asymmetric';

                return 'none';
            };

            /**
             * @TODO mit AP klären, BS!!!
             * @returns {*|number}
             */
            this.getWeakestKeySize = function(){
                return  conversation.recipients.reduce(function(size, recipient){
//                            return size != undefined ? Math.min(recipient.getWeakestKeySize(), size) : recipient.getWeakestKeySize()
                            return size != undefined ? Math.min(recipient.getWeakestKeySize(), size.getWeakestKeySize()) : recipient.getWeakestKeySize()
                        }) || 0
            }

            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name isInPassphraseList
             * @description
             * checks if local user keys in passphraselist
             *
             * @returns {Boolean} boolean Returns a Boolean
             */
            this.isInPassphraseList = function(){
                var localKeys = cmUserModel.loadLocalKeys(),
                    check = false;

                if(asymmetricallyEncryptedPassphrases.length > 0 && cmUtil.isArray(localKeys) && localKeys.length > 0){
                    localKeys.forEach(function(value){
                        asymmetricallyEncryptedPassphrases.forEach(function(key){
                            if(key.keyId == value.id){
                                check = true;
                            }
                        })
                    });
                }

                return check;
            }

        }

        return cmPassphrase;
    }
]);