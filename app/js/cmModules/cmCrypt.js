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
            }
        }
    }
);