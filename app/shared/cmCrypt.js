'use strict';

angular.module('cmCrypt', ['cmLogger'])
.service('cmCrypt',[
    'cmLogger',
    function (cmLogger) {
        /**
         * interval for keypair generation
         * @type {null}
         */
        var genInterval = null;

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

            initGeneration: function(){
//                var BigInteger = titaniumcore.crypto.BigInteger;
//                var RSA = titaniumcore.crypto.RSA;
//                var RSAKeyFormat = titaniumcore.crypto.RSAKeyFormat;
//
//                RSA.installKeyFormat( RSAKeyFormat );

//                var BigInteger = titaniumcore.crypto.BigInteger;
//                var RSA = titaniumcore.crypto.RSA;
//                var RSAKeyFormat = titaniumcore.crypto.RSAKeyFormat;

//                atsOka.RSA.installKeyFormat( atsOka.RSAKeyFormat );
            },

            generateKeypair: function(){
                if ( genInterval != null ) {
                    return;
                }

                function progress(counts){
                    $scope.$apply(function(){
                        $scope.state = 'counts: '+counts;
                    })
                }

                function result(rsa){

                }

                function done( succeeded, count, time ,startTime, finishTime ){
                    genInterval = null;
                    cmLogger.debug('ats-oka done')

                    $scope.$apply(function(){
                        $scope.state =
                            'Elapsed Time '+ cmUtil.millisecondsToStr(time)+'\n'+
                                'Step Count '+count+'\n'+
                                'Start Time '+startTime.toString()+'\n'+
                                'Finished Time '+finishTime.toString()

                        $scope.privKey = base64x_encode( rsaKey.privateKeyBytes() );
                        $scope.pubKey = base64x_encode( rsaKey.publicKeyBytes() );
                    });
                }

//                var rsaKey = new atsOka.RSA();
//                cmLogger.debug('ats-oka generateAsync')
//                genInterval = rsaKey.generateAsync( $scope.keylen, $scope.exp, progress, result, done );
            },

            cancelGeneration: function(){
                if ( genInterval != null ) {
                    cmLogger.debug('ats-oka cancelGeneration')
                    var id = genInterval;
                    genInterval = null;
                    clearInterval( id );
                }
            }
        }
    }]
);