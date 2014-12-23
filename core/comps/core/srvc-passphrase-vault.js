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
    'cmIdentityFactory',
    'cmKeyFactory',
    'cmLogger',
    '$q',

    function(cmUserModel, cmCrypt, cmIdentityFactory, cmKeyFactory, cmLogger, $q){
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


        function getKeyTransmission(sePassphrase, aePassphraseList){

                if(sePassphrase && aePassphraseList.length > 0)
                    return 'mixed';

                if(sePassphrase)                                        
                    return 'symmetric';

                if(aePassphraseList.length > 0 ) 
                    return 'asymmetric';

                return 'none';
            };


        /**
         * Constructor PassphraseVault
         */
        function PassphraseVault(data){


            var sePassphrase            = data.sePassphrase,
                aePassphraseList        = data.aePassphraseList || [],
                recipientKeyList        = data.recipientKeyList || [],
                signatures              = data.signatures       || [],
                self                    = this,

                cache_passphrase        = true,
                cached_passphrase       = undefined


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
                return getKeyTransmission(sePassphrase, aePassphraseList)
            }


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



                //@Todo disable caching if not neccessary
                if(cache_passphrase && couldBeAPassphrase(cached_passphrase))
                    return  $q.when(cached_passphrase)


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
                                if(couldBeAPassphrase(new_passphrase))
                                    cached_passphrase = new_passphrase

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
             * checks if local user has keys in passphraselist
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
             * @name verifyAuthenticity
             * @description
             * Verifies a authentication of vault data
             *
             * @returns {Promise} Returns a promise resolved on success and rejected on failure
             */
            this.verifyAuthenticity = function(){

                if(!signatures || signatures.length == 0)
                    return $q.reject('missing signature')

                // the original signee ought to be among the original recipients, so get them first:
                recipientKeyList
                .map(function(item){
                    return cmIdentityFactory.find(item.identityId)
                })
                .forEach(function(recipient){
                    if(!recipient) return null

                    //add matching key/identity to signature object for later use
                    signatures.forEach(function(signature){
                        var key = recipient.keys.find(signature.keyId)
                        if(key){
                            signature.identity  = recipient
                            signature.key       = key
                        }
                    })
                })

                return  this.get()
                        .then(function(passphrase){
                            return  {
                                        passphrase              : passphrase,
                                        keyTransmission         : self.getKeyTransmission(),
                                        recipientKeyList        : recipientKeyList
                                    }
                        })
                        .then(function(data){
                            return  cmCrypt.hashObject(data) || $q.reject('cmPassphraseVault.verifyAuthenticity: cmCrypt.hashObject() failed.')
                        })
                        .then(function(token){

                            var valid_signatures= [],
                                bad_signatures  = [] 

                            return  $q.all(signatures.map(function(signature){
                                        var key = signature.key

                                        return  key
                                                ?   key.verify(token, signature.content)
                                                    .then(
                                                        function(result){
                                                            valid_signatures.push(signature)
                                                        },
                                                        function(reason){
                                                            bad_signatures.push(signature)
                                                        }
                                                    )
                                                    .finally(function(){
                                                        return $q.when()
                                                    })
                                                :   $q.when()
                                    }))
                                    .then(function(){
                                        return  valid_signatures.length > 0
                                                ?   $q.when(valid_signatures)
                                                :   $q.reject(
                                                        bad_signatures.length > 0 
                                                        ?   {type:1, msg:'verification failed.', bad_signatures: bad_signatures}
                                                        :   {type:0, msg:'no matching keys/identities found for signatures.'}
                                                    )
                                    })
                        })
                        .then(function(valid_signatures){
                            return  valid_signatures.reduce(function(last_try, signature){
                                        return  last_try
                                                .catch(function(){
                                                    return  cmUserModel.verifyIdentityKeys(signature.identity, false, true)
                                                            .then(function(ttrusted_keys){
                                                                return  ttrusted_keys.indexOf(signature.key) != -1
                                                                        ?   $q.when()
                                                                        :   $q.reject('no authenticated key found for signature.')
                                                                    
                                                            })
                                                })
                                    },$q.reject('cmPassphraseVault: .verifyAuthenticity(): signatures invalid'))

                        })
                        .then(function(){
                            return $q.when(recipientKeyList)
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
                            sePassphrase            : sePassphrase,
                            aePassphraseList        : aePassphraseList,
                            keyTransmission         : getKeyTransmission(sePassphrase, aePassphraseList),
                            recipientKeyList        : recipientKeyList,
                            signatures              : signatures
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
            data = data || {}
            data.sePassphrase       = data.sePassphrase       || null,
            data.aePassphraseList   = data.aePassphraseList   || [],
            data.recipientKeyList   = data.recipientKeyList   || [],
            data.signatures         = data.signatures         || []

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
         *              }
         *
         * @return {PassphraseVault}
         */
        this.encryptPassphrase = function(config){
            config =    {
                            passphrase:         config.passphrase       || cmCrypt.generatePassphrase(),
                            password:           config.password         || null,
                            identities:         config.identities       || []                            
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
                    .then(function(result){
                        //get list of all recipients an their keys used to encrypt the passphrase:
                        result.recipientKeyList =   config.identities.map(function(identity){
                                                        return  {
                                                                    identityId: identity.id,
                                                                    keys:       result.asym.filter(function(item){
                                                                                    return identity.keys.find(item.keyId) != null
                                                                                })
                                                                                .map(function(item){
                                                                                    return {id : item.keyId}
                                                                                })
                                                                }                                                        
                                                    })

                        var double_check =  result.asym.length ==   result.recipientKeyList.reduce(function(number_of_keys, item){
                                                                        return number_of_keys + item.keys.length
                                                                    },0)

                        return  double_check
                                ?   result
                                :   $q.reject('cmPassphraseVault.encryptPassphrase(): double check failed.')



                    })
                    .then(function(result){
                        //get signatures:
                        return  cmUserModel.signData(cmCrypt.hashObject({
                                    passphrase              : config.passphrase,
                                    keyTransmission         : getKeyTransmission(result.sym, result.asym),
                                    recipientKeyList        : result.recipientKeyList
                                }))
                                .then(function(signatures){
                                    result.signatures = signatures
                                    return $q.when(result)
                                })


                    })
                    .then(
                        function(result){
                            return  self.create({
                                        sePassphrase:       result.sym,
                                        aePassphraseList:   result.asym,
                                        recipientKeyList:   result.recipientKeyList,
                                        signatures:         result.signatures
                                    })
                                
                        },
                        function(reason){
                            cmLogger.debug('cmPassphraseVault: encryption failed.')
                            return $q.reject(reason)
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