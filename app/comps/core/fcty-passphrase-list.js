'use strict';

angular.module('cmCore').factory('cmPassphraseList',[
    'cmFactory',
    'cmKey',
    'cmUserModel',
    function(cmFactory, cmKey, cmUserModel){

        /**
         * @ngdoc cmCore
         * @name cmPassphraseList
         * @description
         * Handle Passprhase Lists in Conversation
         *
         * @param {object} [data]
         */
        function cmPassphraseList(data){
            var self = this,
                passphrase,
                items = [];

            /**
             * @name init
             * @description
             * Initialize cmPassphraseList
             *
             * @param {array} data
             * @return {cmPassphraseList}
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
             * @param encryptedPassphraseList
             * @param [password]
             * @returns {cmPassphraseList}
             */
            function decryptPassphrase(password) {
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
            }

            /**
             * @name encryptPassphrase
             * @description
             *
             * @param {Array} [recipients]
             * @param {String} [password]
             * @returns {Array}
             */
            function encryptPassphrase(recipients, password){
                var eps = []; //encrypted passphrase list

                if(typeof password === 'string' && password.length > 0){
                    eps =   [{
                        keyId: '_passwd',
                        encryptedPassphrase: cmCrypt.base64Encode(cmCrypt.encryptWithShortKey(password, passphrase))
                    }]
                }

                if(typeof recipients == 'array' && recipients.length > 0){
                    eps = recipients.reduce(function(list, recipient){
                        return list.concat(recipient.encryptPassphrase(passphrase))
                    }, [])
                }

                self.importData(eps);
            }

            /**
             * @name importData
             * @description
             * imports Data from List
             *
             * @param {Array} list
             * @returns {cmPassphraseList}
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
             * @returns {cmPassphraseList}
             */
            this.generatePassphrase = function(){
                if(typeof passphrase != "string" || passphrase.length > 0)
                    cmLogger.debug('cmConversation: passphrase already present, generated new one.');

                passphrase = cmCrypt.generatePassphrase() //TODO: Passphrase generation crappy!!

                return this;
            }

            /**
             * @name getPasshrase
             * @description
             * returns passphrase
             *
             * @param password
             * @returns {string}
             */
            this.getPassphrase = function(password){
                if(typeof passphrase != "string" || passphrase.length > 0)
                    decryptPassphrase(password);

                return passphrase || false;
            };

            /**
             * @name get
             * @description
             * return encrypted passphrase list
             *
             * @param {Array|String} [param1]
             * @param {Array|String} [param2]
             * @returns {Array}
             */
            this.get = function(param1, param2){
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