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
                symmetricallyEncryptedPassphrase    = undefined

            cmObject.addEventHandlingTo(this);

            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name init
             * @description
             * Initialize cmPassphrase
             *
             * @return {Object} this cmPassphrase
             */
            function init(data){

                //init will do nothing yet, in most cases there will be no usable data upon initialization.

                /* old:
                generatePassphrase();

                if(typeof data === 'array'){
                    self.importData(data);
                }
                */
            }



            /**
             * @ngdoc method
             * @methodOf cmPassphraseList
             *
             * @name importAsymmetricalEncryptedPassphrases
             * @description
             * Imports a list of asymmetrically encrypted passphrases as received from the API
             *             *
             * @param {Array} encrypted_passphrase_list A list of encrypted passphrase as received from the API
             * @returns {cmPassphrase} this cmPassphraseList
             */
            this.importAsymmetricallyEncryptedPassphrases = function(list){

                //if the parameter is not an array, treat it as an empty array:
                list = (typeof list == 'object' && list.length > 0) ? list : []

                list.forEach(function(item){
                    var dublicate =     asymmetricallyEncryptedPassphrases.filter(function(already_present_item){
                                            return     already_present_item.keyId == item.keyId 
                                                    && already_present_item.encryptedPassphrase == item.encryptedPassphrase 
                                        }).length > 0
                    if(!dublicate)
                        asymmetricallyEncryptedPassphrases.push(item)
                })                

                console.log('the following items have been imported as asym passes:')
                console.log(asymmetricallyEncryptedPassphrases)

                return this;
            }

            /**
             * @ngdoc method
             * @methodOf cmPassphraseList
             *
             * @name importSymmetricallyEncryptedPassphrase
             * @description
             * Imports a symmetrically encrypted passphrase as received from the API
             *             *
             * @param {Array} encrypted_passphrase_list A list of encrypted passphrase as received from the API
             * @returns {cmPassphrase} this cmPassphraseList
             */
            this.importSymmetricallyEncryptedPassphrase = function(encrypted_passphrase){
                if(typeof encrypted_passphrase == 'string' && encrypted_passphrase.length > 0){
                    symmetricallyEncryptedPassphrase = encrypted_passphrase
                }else{
                    cmLogger.debug('cmPassphrase: importSymmetricallyEncryptedPassphrase(): unable to read encrypted passphrase.')
                }
                return this;
            };


            /**
             * @ngdoc
             * @description  private function to check minimal requirements for a password.
             *
             * @param {*} [password] Anything to be checked wether it could be a password.
             * @return {Boolean} Wheter the suggested password seems okay or not
             */
            function couldBeAPassword(password){
                var result = typeof password == "string" && password.length >= 6

                if(!result) cmLogger.debug('cmPassphrase: couldBeAPassword(): nah, it is not a password: '+password)

                return result
            }

            /**
             * @ngdoc
             * @description  private function to check minimal requirements for a passphrase.
             *
             * @param {*} [password] Anything to be checked wether it could be a passphrase.
             * @return {Boolean} Wheter the suggested passphrase seems okay or not
             */
            function couldBeAPassphrase(password){
                var result = typeof password == "string" && password.length >= 80

                if(!result) cmLogger.debug('cmPassphrase: couldBeAPassphrase(): nah, it is not a passphrase: '+password)

                return result
            }


            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name setPassword
             * @description
             * stores password for later use
             *
             * @param   {string}        pw      The password to be stored
             * @returns {cmPassphrase}  this    Returns cmPassphrase Object
             */
            this.setPassword = function(pw){
                if(couldBeAPassword(password)){
                    password = pw;

                    this.trigger('password:changed');
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
             * @param   {Array}         [idts]    The identities to be stored
             * @returns {cmPassphrase}  this      Returns cmPassphrase Object
             */
            this.setIdentities = function(idts){
                if(typeof identities == 'object' && identities.length > 0){
                    identities = idts
                }

                return this
            }

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
                password = undefined

                this.trigger('password:changed');

                return this
            }


            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name generatePassphrase
             * @description
             * Generates a passphrase; useful only for first time encryption
             *
             * @todo Passphrase generation crappy!!
             */
            this.generate = function(){
                if(couldBeAPassphrase(passphrase))
                    cmLogger.debug('cmPassphrase:generatePassphrase  - passphrase already present, generated new one.');

                passphrase = cmCrypt.generatePassphrase();
            }


            /**
             * @ngdoc mehtod
             * @methodOf cmPassphrase
             *
             * @name  decryptSymmetricallyEncryptedPassphrase (private)
             * 
             * @param  {[type]}     pw  A password to decrypr with
             * @return {Boolean}        Returns whether the decryption was a success or not.
             */
            function decryptSymmetricallyEncryptedPassphrase(pw){
                var old_passphrase = passphrase,
                    new_passphrase = undefined

                if(!couldBeAPassword(pw)) return false

                new_passphrase = cmCrypt.decrypt(password, cmCrypt.base64Decode(symmetricallyEncryptedPassphrase)) || undefined;

                var success                 = couldBeAPassphrase(new_passphrase),
                    passphrase_is_different = new_passphrase != old_passphrase

                if(success && passphrase_is_different){
                    passphrase = new_passphrase
                    this.trigger('passphrase:changed');
                }

                return !!success
            }


            /**
             * @ngdoc method
             * @methodOf cmPassphraseList
             *
             * @name decryptPassphrase 
             * @description
             * Decrypts the encrypted passphrase list into a passphrase ready to be delivered by .getPassphrase()
             *
             * @param   {cmUserModel} user  User providing keys for encryption.
             * @returns {Boolean}           Returns wether the decryption was a success or not.
             */
            function decryptAsymmetricallyEncryptedPassphrase(user) {
                var old_passphrase  = passphrase,
                    new_passphrase  = undefined

                new_passphrase = asymmetricallyEncryptedPassphrases.reduce(function (passphrase, item) {
                    return passphrase || user.decryptPassphrase(item.encryptedPassphrase, item.keyId) || undefined
                }, undefined);

                var success                 = couldBeAPassphrase(new_passphrase),
                    passphrase_is_different = new_passphrase != old_passphrase

                if(success && passphrase_is_different){
                    passphrase = new_passphrase
                    this.trigger('passphrase:changed');
                }

                return !!success
            }


            /**
             * @ngdoc method
             * @methodOf cmPassPhrase
             *
             * @name  decrypt
             * @description 
             * Decrypt passphrase with available means.
             * 
             * @return {cmPassphrase}  this Returns itself for chaining.
             */
            this.decrypt = function(){
                return     decryptSymmetricallyEncryptedPassphrase(password)
                        || decryptAsymmetricallyEncryptedPassphrase(cmUserModel)
            }


            /**
             * @ngdoc method
             * @methodOf cmPassPhrase
             *
             * @name  get
             * @description 
             * Deliver passphrase encrypted in the previously imported data, if no decrypted passphrase is available try to decrypt it.
             * 
             * @return {String| Boolean}  Returns the passphrase encrypted in the previously imported data or false if unsuccessfull.
             */
            this.get = function(){
                if(couldBeAPassphrase(passphrase)){
                    return passphrase
                } else {
                    return this.decrypt() ? passphrase : false

                }
            }



            /**
             * @ngdoc method
             * @methodOf cmPassPhrase
             *
             * @name symmetricallyEncryptPassphrase
             * @description 
             * Symmetrically encrypted previously provided passphrase with a password.
             * 
             * @param  {String}         pw The password to encrypt with
             * @return {String|Boolean}    Returns a string if successful or false if not.
             */
            function symmetricallyEncryptPassphrase(pw){
                if(couldBeAPassword(pw) && couldBeAPassphrase(passphrase)){
                    return cmCrypt.base64Encode(cmCrypt.encryptWithShortKey(password, passphrase));
                } else {
                    return false
                    cmLogger.debug('cmPassphrase:symmetricallyEncryptPassphrase - provide a proper password and and passphrase before encrypting the passphrase!');
                }
            }




            /**
             * @ngdoc method
             * @methodOf cmPassPhrase
             *
             * @name symmetricallyEncryptPassphrase
             * @description 
             * Symmetrically encrypted previously provided passphrase with a password.
             * 
             * @param  {Array}          identities  Array of identities to encrypt the passphrase for.
             * @return {String|Boolean}             
             */
            function asymmetricallyEncryptPassphrase(identities){
                var new_encrypted_passphrase_list = []; 

                if(couldBeAPassphrase(passphrase) && typeof identities == 'object' && identities.length > 0){

                    new_encrypted_passphrase_list = recipients.map(function(recipient){
                                                        return recipient.encryptPassphrase(passphrase)
                                                    })
                }

                self.importAsymmetricallyEncryptedPassphrases(new_encrypted_passphrase_list)
            }




            /**
             * @ngdoc method
             * @methodOf cmPassphraseList
             *
             * @name encryptPassphrase
             * @description
             * Deliver an object with the passphrase encrypted with available means ready to be submitted to the API.
             *
             * Returns an encrypted passphrase list ready to be submitted to the API.
             */
            function encryptPassphrase(){
                return  {
                            sePassphrase : symmetricallyEncryptedPassphrase(password),
                            aePassphraselist: asymmetricallyEncryptedPassphrases(identities)
                        }
            }



            /**
             * @ngdoc method
             * @methodOf cmPassphraseList
             *
             * @name getEncryptionType
             * @description
             * return encryption type
             *
             * @returns {String} encryption type - 'none' || 'symmetric' || 'asymmetric' || 'mixed'
             */
            this.getEncryptionType = function(){
                if(symmetricallyEncryptedPassphrase && asymmetricallyEncryptedPassphrases.length > 0)
                    return 'mixed' 

                if(symmetricallyEncryptedPassphrase)                                        
                    return 'symmetric'

                if(asymmetricallyEncryptedPassphrases.length > 0 ) 
                    return 'asymmetric'

                return 'none'
            };














            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name setPassword
             * @description
             * generates encrypted passphrase on every call!
             *
             * @returns {String|Boolean} param Return encrypted passphrase on error return false
             */
            this.getEncryptedPassphrase = function(password){
                this.setPassword(password);

                if(passphrase == undefined){
                    generatePassphrase();
                }

                return createEncryptedPassphrase();
            };


            /**
             * @ngdoc method
             * @methodOf cmPassphraseList
             *
             * @name setPassphrase
             * @description
             * set sePassphrase
             *
             *
             * @param {String} sePassphrase encrypted passphrase
             * @returns {Boolean} bool If sePassphrase is correct, returns true
             */
            /*
            this.setPassphrase = function(sePassphrase){
                if(typeof sePassphrase != "string" || sePassphrase.length > 0){
                    passphrase = sePassphrase;
                    return true;
                }

                return false;
            };
            */

            /**
             * @ngdoc method
             * @methodOf cmPassphraseList
             *
             * @name isEncrypted
             * @description
             * Returns true if list is not empty.
             *
             * @returns {boolean} bool Boolean
             */
            this.isEncrypted = function(){
                return     asymmetricallyEncryptedPassphrases.length > 0 
                        || (
                               typeof symmetricallyEncryptedPassphrase == 'string' 
                            && symmetricallyEncryptedPassphrase.length > 0
                           );
            };

            /**
             * @ngdoc method
             * @methodOf cmPassphraseList
             *
             * @name exportData
             * @description
             * return encrypted passphrase list
             *
             * @deprecated
             *
             * @param {Array|String} [param1] recipient or password
             * @param {Array|String} [param2] recipient or password
             * @returns {Array} items encrypted passphrase list
             */
            this.exportData = function(param1, param2){
                if(items.length == 0){
                    var recipients = typeof param1 == 'object' && param1.length > 0 ? param1 : param2,
                        password = typeof param1 == 'string' ? param1 : param2;

                    encryptPassphrase(recipients, password);
                }

                return items;
            };
        }

        return cmPassphrase;
    }
]);