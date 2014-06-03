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
                passphrase

            this.items = [];



            /**
             * @name init
             * @description
             * Initialize cmPassphraseList
             *
             * @param {object} data
             * @return {cmPassphraseList}
             */
            function init(data){
                if(typeof data === 'object'){
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
                passphrase = self.items.reduce(function (passphrase, item) {
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
             * @name importData
             * @description
             * imports Data from List
             *
             * @param list
             * @returns {cmPassphraseList}
             */
            this.importData = function(list){
                var check = false,
                    list = list || []

                list.forEach(function(item){
                    check = self.items.reduce(function(found, current){
                        return found || (item.keyId == current.keyId);
                    },false);

                    if(check === false){
                        self.items.push(item);
                    }
                });

                return this;
            };

            /**
             * @name getPasshrase
             * @description
             * returns passphrase
             *
             * @param password
             * @returns {*}
             */
            this.getPassphrase = function(password){
                if(typeof passphrase != "string" || passphrase.length > 0) decryptPassphrase(password)
                return passphrase;
            };

            init(data);
        }

        return cmPassphraseList;
    }
]);