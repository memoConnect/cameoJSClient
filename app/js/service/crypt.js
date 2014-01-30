'use strict';

/**
 * collection of client side crypt stuff
 */
app.factory('cmCrypt',
    function($log){

        return {
            /**
             * this method calculates a secure hash
             * @param secureString String that should be hashed
             */
            hash: function(secretString){
                return sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(secretString)) || ""
            }
        }
    }
);