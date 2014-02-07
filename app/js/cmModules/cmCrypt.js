'use strict';

/**
 * collection of client side crypt stuff
 */

var cmCrypt = angular.module('cmCrypt', ['cmLogger'])

cmCrypt.factory('cmCrypt',
    function ($log) {

        return {
            /**
             * this method calculates a secure hash
             * @param secureString String that should be hashed
             */
            hash: function (secretString) {
                if (null == secretString)
                    return ""

                return sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(secretString))
            },

            /**
             * this method encrypts strings
             * @param secretKey a secret key with max len of 10 chars
             * @param secretString a string that should be enrypted
             * @returns base64 encoded encrypted string
             */
            encryptWithShortKey: function (secretKey, secretString) {
                var parameters = { cipher: "aes", ks: 256, iter: 4096 };

                if (null == secretString)
                    return "";
                if (secretKey.length > 10)
                    return "";

                var encryptedSecretString = sjcl.json.encrypt(String(secretKey), String(secretString), parameters);

                return Base64.encode(encryptedSecretString);
            },
            /**
             * this method encrypts strings
             * @param secretKey a secret key with min len of 60 chars
             * @param secretString a string that should be enrypted
             * @returns base64 encoded encrypted string
             */
            encrypt: function (secretKey, secretString) {
                var parameters = {cipher: "aes", ks: 256, iter: 500 };

                if (null == secretString)
                    return ""
                if (secretKey.length < 60)
                    return ""

                var encryptedSecretString = sjcl.json.encrypt(String(secretKey), String(secretString), parameters);

                return Base64.encode(encryptedSecretString);
            },
            /**
             * this method decrypts uuencoded strings
             * @param secretKey a secret key
             * @param secretString a base64 encoded string that should be derypted
             * @returns decrypted string
             */
            decrypt: function (secretKey, secretString) {
                if (null == secretString)
                    return ""

                var decodedSecretString = Base64.decode(secretString);

                return sjcl.decrypt(secretKey, decodedSecretString)
            }

        }
    }
);