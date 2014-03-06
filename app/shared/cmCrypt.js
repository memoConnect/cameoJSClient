'use strict';

angular.module('cmCrypt', ['cmLogger'])
.service('cmCrypt',[
    'cmLogger',
    '$q',
    function (cmLogger, $q) {
        // private vars
        var _genInterval = null,
            _atsOka;

        return {
            /**
             * this method calculates a secure hash
             * @param secretString String that should be hashed
             */
            hash: function (secretString) {
                if (null == secretString)
                    return "";

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
             * @param secretString a string that should be encrypted
             * @returns base64 encoded encrypted string
             */
            encrypt: function (secretKey, secretString) {
                var parameters = {cipher: "aes", ks: 256, iter: 500 };

                if (null == secretString)
                    return "";

                if (secretKey.length < 60)
                    return "";

                var encryptedSecretString = sjcl.json.encrypt(String(secretKey), String(secretString), parameters);

                return Base64.encode(encryptedSecretString);
            },
            /**
             * this method decrypts uuencoded strings
             * @param secretKey a secret key
             * @param secretString a base64 encoded string that should be decrypted
             * @returns decrypted string
             */
            decrypt: function (secretKey, secretString) {
                if (null == secretString)
                    return false;

                var decodedSecretString = Base64.decode(secretString),
                    decryptedString;

                try {
                    decryptedString = sjcl.decrypt(secretKey, decodedSecretString)
                } catch (e) {
                    cmLogger.warn('Unable to decrypt.', e)
                }

                return decryptedString || false
            },


            getKeyLengths: function(){
                return ['128','1024','2048','4096'];
            },

            getExpotential: function(){
                return 65537;
            },

            generateKeypair: function(keylen, $scopeState){
                if ( _genInterval != null ) {
                    return;
                }

                var promise = $q.defer();

                // init atsOka is wrapped in window
                if(_atsOka == undefined){
                    _atsOka = window.atsOka();
                    _atsOka.titaniumcore.crypto.RSA.installKeyFormat( _atsOka.titaniumcore.crypto.RSAKeyFormat );
                }

                /**
                 * create empty class of RSA
                 * @type {_atsOka.titaniumcore.crypto.RSA}
                 */
                var rsaKey = new _atsOka.titaniumcore.crypto.RSA();

                /**
                 * called in the whole progress of keygeneration to show spinner
                 * @param counts
                 */
                function progress(counts){
//                    cmLogger.debug('ats-oka progress')
                    if($scopeState != undefined){
                        $scopeState.$apply(function(){
                            $scopeState.state = 'counts: '+counts;
                        })
                    }
                }

                function result(rsa){

                }

                /**
                 * called after key generation is succeed and hide spinner
                 * @param succeeded
                 * @param count
                 * @param time
                 * @param startTime
                 * @param finishTime
                 */
                function done( succeeded, count, time ,startTime, finishTime ){
                    _genInterval = null;
                    cmLogger.debug('ats-oka done')

                    promise.resolve({
                        time: time,
                        count: count,
                        startTime: startTime,
                        finishTime: finishTime,
                        privKey: _atsOka.base64x_encode( rsaKey.privateKeyBytes() ),
                        pubKey: _atsOka.base64x_encode( rsaKey.publicKeyBytes() )
                    })
                }

                cmLogger.debug('ats-oka generateAsync '+keylen+' '+this.getExpotential());
                _genInterval = rsaKey.generateAsync( keylen, this.getExpotential(), progress, result, done );

                return promise.promise;
            },
            /**
             * cancel key generation process / simple clearInterval
             */
            cancelGeneration: function(){
                if ( _genInterval != null ) {
                    cmLogger.debug('ats-oka cancelGeneration')
                    var id = _genInterval;
                    _genInterval = null;
                    clearInterval( id );
                }
            }
        }
    }]
);