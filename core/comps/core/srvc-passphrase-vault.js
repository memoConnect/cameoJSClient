'use strict';

/**
 * @ngdoc object
 * @name cmPassphraseVault
 * @description
 * Handle Passphrase Conversation
 *
 * @requires cmUserModel
 * @requires cmCrypt
 * @requires $q
 */
angular.module('cmCore').service('cmPassphraseVault',[

    'cmUserModel',
    'cmCrypt',
    '$q',

    function(cmUserModel, cmCrypt, $q){
        var self = this

        /** utility functions **/

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
         * Constructor PassphraseVault
         */
        function PassphraseVault(data){


            var sePassphrase        = data.sePassphrase,
                aePassphraseList    = data.aePassphraseList || [],
                self                = this

            /**
             * @ngdoc method
             * @methodOf PassphraseVault
             *
             * @name getKeyTransmission
             * @description
             * return encryption type
             *
             * @returns {String} encryption type - 'none' || 'symmetric' || 'asymmetric' || 'mixed'
             */
            this.getKeyTransmission = function(){

                if(sePassphrase && aePassphraseList.length > 0)
                    return 'mixed';

                if(sePassphrase)                                        
                    return 'symmetric';

                if(aePassphraseList.length > 0 ) 
                    return 'asymmetric';

                return 'none';
            };


            /**
             * @ngdoc mehtod
             * @methodOf PassphraseVault
             *
             * @name get
             * 
             * @param {String} [password] A password to decrypt with
             * @return {promise} Resolves with passphrase if successfull
             */

            this.get = function(password){
                console.log('PassphraseVault.get')
                return  $q.reject('unknown.')
                        //try symmetric decryption first:,               
                        .catch(function(){
                            //check if a valid password has been passed to the function 
                            //and a symmetrically encrypted passphrase is present:
                            return  couldBeAPassword(password) && sePassphrase
                                    ?   cmCrypt.decrypt(password, cmCrypt.base64Decode(sePassphrase))
                                    :   $q.reject('password invalid.')
                        })
                        //try asymmetrical decryption if neccessary:                
                        .catch(function(reason){
                            return  aePassphraseList // could be an empty array
                                    .reduce(function(previous_try, item) {
                                        return  previous_try                
                                                //if decryption has been successfull already there will be nothing to catch:
                                                .catch(function(){
                                                    return cmUserModel.decryptPassphrase(item.encryptedPassphrase, item.keyId)
                                                })
                                    }, $q.reject(reason))
                        })
                        //finally check if decryption resolved with a proper passphrase,
                        //if so resolve with passphrase,
                        //if not reject 
                        .then(
                            function(new_passphrase){
                                return  couldBeAPassphrase(new_passphrase)
                                        ?   $q.when(new_passphrase)
                                        :   $q.reject('decrypted passphrase invalid.')
                            },
                            function(reason){
                                return $q.reject(reason)
                            }
                        )
            }

            /**
             * @ngdoc method
             * @methodOf PassphraseVault
             *
             * @name userHasAccess
             * @description
             * checks if local user keys in passphraselist
             *
             * @returns {Boolean} boolean Returns a Boolean
             */
            this.userHasAccess = function(){
                var localKeys = cmUserModel.loadLocalKeys()

                return  localKeys.some(function(key){
                            return aePassphraseList.some(function(item){
                                return item.keyId == key.id
                            })
                        })
            }

            /**
             * @ngdoc method
             * @methodOf PassphraseVault
             *
             * @name exportData
             * 
             *
             * @return {Object} returns encryption data ready to be submitted to the API.
             */
            this.exportData = function(){                
                return  {
                            sePassphrase        : sePassphrase,
                            aePassphraseList    : aePassphraseList,
                            keyTransmission     : this.getKeyTransmission()
                        }
            }
        }











        /**
         * @ngdoc method
         * @methodOf cmPassphraseVault
         *
         * @name create
         *
         * @discription
         * Creates a new PassphraseVault 
         *
         * @return {PassphraseVault}
         */
        this.create = function(data){
            data =  {
                        sePassphrase:       data.sePassphrase       || null,
                        aePassphraseList:   data.aePassphraseList   || []
                    }

            return new PassphraseVault(data)
        }

        /**
         * @ngdoc method
         * @methodOf cmPassphraseVault
         *
         * @name encryptPassphrase
         *
         * @description
         * Creates a new PassphraseVault 
         *
         * @params {Object} config
         * config =    {
         *                  passphrase:         config.passphrase       || cmCrypt.generatePassphrase(),
         *                  password:           config.password         || null,
         *                  identities:         config.identities       || [],
         *                  restrict_to_keys:   config.restrict_to_keys || null
         *              }
         *
         * @return {PassphraseVault}
         */
        this.encryptPassphrase = function(config){
            config =    {
                            passphrase:         config.passphrase       || cmCrypt.generatePassphrase(),
                            password:           config.password         || null,
                            identities:         config.identities       || [],
                            restrict_to_keys:   config.restrict_to_keys || null
                        }


            return $q.all({
                        //symmetrical encryption:
                        sym:    couldBeAPassword(config.password) && couldBeAPassphrase(config.passphrase)
                                ?   cmCrypt.base64Encode(cmCrypt.encryptWithShortKey(config.password, config.passphrase))
                                :   $q.when(undefined)
                        ,
                        //asymmetrically encrypt:
                        asym:   couldBeAPassphrase(config.passphrase)
                                ?   $q.all(
                                        config.identities.map(function(identity){
                                            return identity.keys.encryptPassphrase(config.passphrase, config.restrict_to_keys)
                                        })
                                    )
                                    .then(function(results){
                                        return Array.prototype.concat.apply([], results)
                                    })
                                :   $q.when([])
                    })
                    .then(
                        function(result){
                            return  self.create({
                                        sePassphrase:       result.sym,
                                        aePassphraseList:   result.asym
                                    })
                        },
                        function(){
                            cmLogger.debug('cmPassphraseVault: encryption failed.')
                            return null
                        }
                    )
        }







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

    }
]);