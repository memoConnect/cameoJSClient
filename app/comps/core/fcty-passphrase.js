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
            var self = this,
                passphrase = undefined,
                sePassphrase = undefined,
                password = undefined,
                items = [];

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
                generatePassphrase();

                if(typeof data === 'array'){
                    self.importData(data);
                }
            }

            function createEncryptedPassphrase(){
                if(password !== undefined && passphrase !== undefined){
                    return cmCrypt.base64Encode(cmCrypt.encryptWithShortKey(password, passphrase));
                } else {
                    cmLogger.debug('cmPassphrase:getEncryptedPassphrase - set a password and generate a passphrase before encrypt passphrase!');
                }

                return false;
            }

            function decryptSEPassphrase(pw){
                if((typeof pw == 'string' && pw.length > 0) && (typeof sePassphrase == 'string' && sePassphrase.length > 0)){
                    passphrase = cmCrypt.decrypt(pw, cmCrypt.base64Decode(sePassphrase)) || '';
                }

                return false;
            }

            /**
             * @ngdoc method
             * @methodOf cmPassphraseList
             *
             * @name decryptPassphrase
             * @description
             * Decrypts the encrypted passphrase list into a passphrase ready to be delivered by .getPassphrase()
             *
             * @deprecated
             *
             * @param {String} password optional
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
             * @ngdoc method
             * @methodOf cmPassphraseList
             *
             * @name encryptPassphrase
             * @description
             *
             * @deprecated
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
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name generatePassphrase
             * @description
             * generates a passphrase
             *
             * @todo Passphrase generation crappy!!
             */
            function generatePassphrase(){
                if(typeof passphrase == "string" && passphrase.length > 0)
                    cmLogger.debug('cmPassphrase:generatePassphrase  - passphrase already present, generated new one.');

                passphrase = cmCrypt.generatePassphrase();
            }

            /**
             * @ngdoc method
             * @methodOf cmPassphrase
             *
             * @name setPassword
             * @description
             * set Password to Object
             *
             * @returns {Object} this Returns cmPassphrase Object
             */
            this.setPassword = function(pw){
                if(typeof pw === 'string' && pw.length > 0){
                    password = pw;

                    this.trigger('password:changed');
                }

                return this;
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

            this.setEncryptedPassphrase = function(p){
                if(typeof p === 'string' && p.length > 0){
                    sePassphrase = p;
                }

                return this;
            };

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
                var type = 'none'

                if(typeof sePassphrase == 'string' && sePassphrase.length > 0 && items.length > 0){
                    type = 'mixed';
                } else if(typeof sePassphrase == 'string' && sePassphrase.length > 0 && items.length == 0){
                    type = 'symmetric';
                } else if(typeof sePassphrase != 'string' && items.length > 0){
                    type = 'asymmetric';
                }

                return type;

//                return items.reduce(function(type, item){
//                    if (! 'keyId' in item )
//                        return type;
//
//                    if(item.keyId == '_passwd')
//                        return 'symmetric';
//
//                    return type == 'symmetric' ? 'mixed' : 'asymmetric'
//
//                }, 'none');
            };

            /**
             * @ngdoc method
             * @methodOf cmPassphraseList
             *
             * @name importData
             * @description
             * imports Data from List
             *
             * @deprecated
             *
             * @param {Array} list Data from API Request
             * @returns {cmPassphraseList} this cmPassphraseList
             */
            this.importData = function(list){
                var check = false;

                if(typeof list !== 'object' && typeof list !== 'array')
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
             * @ngdoc method
             * @methodOf cmPassphraseList
             *
             * @name getPassphrase
             * @description
             * returns passphrase
             *
             * @param {String} password password for encryption
             * @returns {String|Boolean} passphrase Description :p
             */
            this.getPassphrase = function(password){
                if(typeof passphrase != "string" || passphrase.length > 0)
                    decryptSEPassphrase(password);

                return passphrase || false;
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
            this.setPassphrase = function(sePassphrase){
                if(typeof sePassphrase != "string" || sePassphrase.length > 0){
                    passphrase = sePassphrase;
                    return true;
                }

                return false;
            };

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
                return (items.length > 0 || (typeof sePassphrase == 'string' && sePassphrase.length > 0));
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
                    var recipients = typeof param1 == 'array' ? param1 : param2,
                        password = typeof param1 == 'string' ? param1 : param2;

                    encryptPassphrase(recipients, password);
                }

                return items;
            };
        }

        return cmPassphrase;
    }
]);