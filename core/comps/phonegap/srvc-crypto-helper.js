'use strict';

// https://github.com/memoConnect/de.cameonet.cordova.crypto

angular.module('cmPhonegap')
.service('cmCryptoHelper', [
    'cmPhonegap', 'cmDevice', 'cmLogger', 'cmUtil',
    '$window', '$q',
    function (cmPhonegap, cmDevice, cmLogger, cmUtil,
              $window, $q) {

        var self = {
            plugin: null,
            keySize: 2048,

            init: function(){
                cmPhonegap.isReady(function(){

                    if(!('cmCryptoHelper' in $window)){
                        //cmLogger.info('CRYPTOHELPER PLUGIN IS MISSING');
                        return false;
                    }

                    // only for ios
                    if(!cmDevice.isiOS()){
                        return false;
                    }

                    self.plugin = $window.cmCryptoHelper;
                });
            },

            isAvailable: function(){
                return this.plugin != null;
            },

            getPrivateKey: function(length){
                var deferred = $q.defer();

                if(this.isAvailable()){
                    this.plugin.getPrivateKey(function (privKey) {
                            deferred.resolve(privKey);
                        }, function () {
                            deferred.reject();
                        },
                            length | self.keySize
                    );
                } else {
                    deferred.reject('NO PLUGIN EXISTS');
                }

                return deferred.promise;
            },

            rsaEncrypt: function(publicKey, plainText){
                var deferred = $q.defer();

                if(this.isAvailable()){
                    this.plugin.encrypt(
                        function (result) {
                            deferred.resolve(result);
                        }, 
                        function (reason) {
                            deferred.reject(reason);
                        },
                        publicKey, 
                        plainText
                    )
                } else {
                    deferred.reject('NO PLUGIN EXISTS');
                }

                return deferred.promise;
            },

            rsaDecrypt: function(privateKey, encryptedText){
                var deferred = $q.defer();

                if(this.isAvailable()){
                    this.plugin.encrypt(
                        function (result) {
                            deferred.resolve(result);
                        }, 
                        function (reason) {
                            deferred.reject(reason);
                        },
                        privateKey, 
                        encryptedText
                    )
                } else {
                    deferred.reject('NO PLUGIN EXISTS');
                }

                return deferred.promise;
            },

            rsaSign: function(privateKey, text){
                var deferred = $q.defer();

                if(this.isAvailable()){
                    this.plugin.encrypt(
                        function (result) {
                            deferred.resolve(result);
                        }, 
                        function (reason) {
                            deferred.reject(reason);
                        },
                        privateKey, 
                        text
                    )
                } else {
                    deferred.reject('NO PLUGIN EXISTS');
                }

                return deferred.promise;
            },

            rsaVerify: function(publicKey, text, signature){
                var deferred = $q.defer();

                if(this.isAvailable()){
                    this.plugin.encrypt(
                        function (result) {
                            result == 'true'
                            ?   deferred.resolve(result)
                            :   deferred.reject(result)
                        }, 
                        function (reason) {
                            deferred.reject(reason);
                        },
                        publicKey, 
                        text,
                        signature
                    )
                } else {
                    deferred.reject('NO PLUGIN EXISTS');
                }

                return deferred.promise;
            }

        };

        self.init();

        return self;
    }
]);