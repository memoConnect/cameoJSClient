'use strict';

/**
 * @ngdoc cmCore
 * @name cmPassphraseList
 * @description
 * Handle Passprhase Lists in Conversation
 *
 * @requires cmFactory
 * @requires cmKey
 * @requires cmUserModel
 */
angular.module('cmCore').factory('cmPassphraseList',[
    'cmFactory',
    'cmKey',
    'cmUserModel',
    'cmObject',
    function(cmFactory, cmKey, cmUserModel,cmObject){

        /**
         * @ngdoc method
         * @name cmPassphraseList
         *
         * @param {Object} [data] Data from API CAll
         */
        function cmPassphraseList(data){
            var self = this,
                passphrase = '',
                items = [];

            cmObject.addEventHandlingTo(this);

            /**
             * @name init
             * @description
             * Initialize cmPassphraseList
             *
             * @param {Array} data
             * @return {cmPassphraseList} this cmPassphraseList
             */
            function init(data){
                if(typeof data === 'array'){
                    self.importData(data);
                }

                return self;
            }

            /**
             * @name decryptPassphrase
             * @description
             * Decrypts the encrypted passphrase list into a passphrase ready to be delivered by .getPassphrase()
             *
             * @param {String} [password] password
             */
            function decryptPassphrase(password) {
                var oldPassphrase = passphrase;

                passphrase = items.reduce(function (passphrase, item) {
                    var result;

                    if (passphrase) {
                        result = passphrase;
                    } else if ((item.keyId == "_passwd" && password)) {
                        result = cmCrypt.decrypt(password, cmCrypt.base64Decode(item.encryptedPassphrase)) || ''
                    } else {
                        result = cmUserModel.decryptPassphrase(item.encryptedPassphrase, item.keyId) || ''
                    }

                    return result;

                }, '');

                if(passphrase !== oldPassphrase){
                    self.trigger('passphrase:changed');
                }
            }

            /**
             * @name encryptPassphrase
             * @description
             *
             * @param {Array} [recipients] array of recipients
             * @param {String} [password] password
             */
            function encryptPassphrase(recipients, password){
                var eps = []; //encrypted passphrase list

                if(typeof password === 'string' && password.length > 0){
                    eps.push({
                        keyId: '_passwd',
                        encryptedPassphrase: cmCrypt.base64Encode(cmCrypt.encryptWithShortKey(password, passphrase))
                    });
                }

                if(typeof recipients == 'array' && recipients.length > 0){
                    eps = eps.concat(recipients.reduce(function(list, recipient){
                        return list.concat(recipient.encryptPassphrase(passphrase))
                    }, []));
                }

                self.importData(eps);
            }

            /**
             * @name importData
             * @description
             * imports Data from List
             *
             * @param {Array} list Data from API Request
             * @returns {cmPassphraseList} this cmPassphraseList
             */
            this.importData = function(list){
                var check = false;

                if(typeof list !== 'array')
                    list = [];

                list.forEach(function(item){
                    check = items.reduce(function(found, current){
                        return found || (item.keyId == current.keyId);
                    },false);

                    if(check === false){
                        items.push(item);
                    }
                });

                return this;
            };

            /**
             * @name generatePassphrase
             * @description
             * generates a passhrase
             *
             * @returns {cmPassphraseList} this cmPassphraseList
             */
            this.generatePassphrase = function(){
                if(typeof passphrase != "string" || passphrase.length > 0)
                    cmLogger.debug('cmConversation: passphrase already present, generated new one.');

                passphrase = cmCrypt.generatePassphrase() //TODO: Passphrase generation crappy!!

                return this;
            }

            /**
             * @name getEncryptionType
             * @description
             * return encryption type
             *
             * @returns {String} encryption type - 'none' || 'symmetric' || 'asymmetric' || 'mixed'
             */
            this.getEncryptionType = function(){
                return items.reduce(function(type, item){
                    if (! 'keyId' in item )
                        return type;

                    if(item.keyId == '_passwd')
                        return 'symmetric';

                    return type == 'symmetric' ? 'mixed' : 'asymmetric'

                }, 'none');
            };

            /**
             * @name getPasshrase
             * @description
             * returns passphrase
             *
             * @param {String} password password
             * @returns {String} passphrase passphrase
             */
            this.getPassphrase = function(password){
                if(typeof passphrase != "string" || passphrase.length > 0)
                    decryptPassphrase(password);

                return passphrase || false;
            };

            this.isEncrypted = function(){
                  return (items.length > 0);
            };

            /**
             * @name exportData
             * @description
             * return encrypted passphrase list
             *
             * @param {Array|String} [param1] recipient or password
             * @param {Array|String} [param2] recipient or password
             * @returns {Array} items encrypted passphrase list
             */
            this.exportData = function(param1, param2){
                if(items.length == 0){
                    var recipients = typeof param1 == 'array' ? param1 : param2,
                        password = typeof param1 == 'string' ? param1 : param2;

                    encryptPassphrase(recipients, password);
                }

                return items;
            };

            init(data);
        }

        return cmPassphraseList;
    }
]);