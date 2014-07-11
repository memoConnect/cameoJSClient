'use strict';

/**
 * @ngdoc object
 * @name cmPassphrase
 * @description
 * Handle Passphrase Conversation
 *
 * @requires cmFactory
 * @requires cmKey
 * @requires cmUserModel
 * @requires cmCrypt
 * @requires cmObject
 * @requires cmLogger
 */
angular.module('cmCore').factory('cmPassphrase',[
    'cmFactory',
    'cmKey',
    'cmUserModel',
    'cmCrypt',
    'cmObject',
    'cmLogger',
    function(cmFactory, cmKey, cmUserModel, cmCrypt, cmObject, cmLogger){

        function cmPassphrase(){
            var self            = this,
                passphrase      = undefined,
                password        = undefined,
                identities      = undefined,
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
                if(typeof encrypted_passphrase == 'string' && encrypted_passphrase.length > 0){
                    symmetricallyEncryptedPassphrase = encrypted_passphrase
                }else{
//                    cmLogger.debug('cmPassphrase: importSymmetricallyEncryptedPassphrase(): unable to read encrypted passphrase.')
                }
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
                if(couldBeAPassword(pw)){
                    password = pw;

                    this.trigger('password:changed');                    
                }else{
//                    cmLogger.debug('cmPassphrase: unable to set Password, requirements not met.')
                }

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
                if(typeof idts == 'object' && idts.length > 0){
                    identities = idts;
                }

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

                this.trigger('password:changed');

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
                if(couldBeAPassphrase(passphrase)){
//                    cmLogger.debug('cmPassphrase:generatePassphrase  - passphrase already present, generated new one.');
                }

                passphrase = cmCrypt.generatePassphrase();
                
                return this
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
            function decryptSymmetricallyEncryptedPassphrase(pw){

                var old_passphrase = passphrase,
                    new_passphrase = undefined;

                if(!couldBeAPassword(pw) || !symmetricallyEncryptedPassphrase) 
                    return false

                new_passphrase = cmCrypt.decrypt(password, cmCrypt.base64Decode(symmetricallyEncryptedPassphrase)) || undefined;
                

                var success                 = couldBeAPassphrase(new_passphrase),
                    passphrase_is_different = new_passphrase != old_passphrase

                if(success && passphrase_is_different){
                    passphrase = new_passphrase
                    self.trigger('passphrase:changed');
                }

                return !!success
            }

            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name decryptAsymmetricallyEncryptedPassphrase
             * @description
             * Decrypts the encrypted passphrase list into a passphrase ready to be delivered by .getPassphrase()
             *
             * @param {cmUserModel} user User providing keys for encryption.
             * @returns {Boolean} Returns wether the decryption was a success or not.
             */
            function decryptAsymmetricallyEncryptedPassphrase(user) {
                var old_passphrase  = passphrase,
                    new_passphrase  = undefined;

                new_passphrase = asymmetricallyEncryptedPassphrases.reduce(function (passphrase, item) {
                    return passphrase || user.decryptPassphrase(item.encryptedPassphrase, item.keyId) || undefined
                }, undefined);

                var success                 = couldBeAPassphrase(new_passphrase),
                    passphrase_is_different = new_passphrase != old_passphrase

                if(success && passphrase_is_different){
                    passphrase = new_passphrase
                    self.trigger('passphrase:changed');
                }

                return !!success
            }

            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name decrypt
             * @description 
             * Decrypt passphrase with available means.
             * 
             * @return {cmPassphrase} this Returns itself for chaining.
             */
            this.decrypt = function(){
                return     decryptSymmetricallyEncryptedPassphrase(password)
                        || decryptAsymmetricallyEncryptedPassphrase(cmUserModel)
            };

            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name get
             * @description 
             * Deliver passphrase encrypted in the previously imported data, if no decrypted passphrase is available try to decrypt it.
             * 
             * @return {String|Boolean} Returns the passphrase encrypted in the previously imported data or false if unsuccessfull.
             */
            this.get = function(){
                if(couldBeAPassphrase(passphrase))
                    return passphrase

                if(passphrase === null) //encryption is disabled
                    return null

                return this.decrypt() ? passphrase : false
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
            function symmetricallyEncryptPassphrase(pw){
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
            function asymmetricallyEncryptPassphrase(identities, keyList){
//                console.log(couldBeAPassphrase(passphrase) && typeof identities == 'object' && identities.length > 0)
//
//                console.log('passphrase', passphrase)
//                console.log('typeof identities', typeof identities)
//                console.log('identities.length', identities.length)

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
            this.encrypt = function(){
                var sym     = symmetricallyEncryptPassphrase(password),
                    asym    = asymmetricallyEncryptPassphrase(identities);

                self.importSymmetricallyEncryptedPassphrase(sym);
                self.importAsymmetricallyEncryptedPassphrase(asym);

                return this;
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
                this.encrypt();
                return  {
                            sePassphrase        : symmetricallyEncryptedPassphrase,
                            aePassphraseList    : asymmetricallyEncryptedPassphrases,
                            keyTransmission     : this.getKeyTransmission()
                        }
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
                return passphrase === null;
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
                passphrase = null;
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

                if(asymmetricallyEncryptedPassphrases.length > 0 && typeof localKeys == 'array' && localKeys.length > 0){
                    localKeys.forEach(function(value){
                        asymmetricallyEncryptedPassphrases.forEach(function(key){
                            if(key.keyId == value.keyId){
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