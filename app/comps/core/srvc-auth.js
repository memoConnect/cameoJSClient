'use strict';

/**
 * @ngdoc service
 * @name cmAuth
 * @description
 * beschreibung cmAuth
 *
 * @requires cmApi
 * @requires localStorage TODO: implement ServiceLocalStorage
 */

angular.module('cmCore').service('cmAuth', [
    'cmApi',
    'cmObject',
    function(cmApi, cmObject){
        var auth = {
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name requestToken
             * @description
             * Ask the api for a new authentication token
             *
             * @param {String} login Loginname of user
             * @param {String} pass Password of user
             * @returns {Promise} for async handling
             */
            requestToken: function(login, pass){
                var auth = _Base64.encode(login + ":" + pass);

                return cmApi.get({
                    path: '/token',
                    headers: { 'Authorization': 'Basic '+auth } ,
                    exp_ok: 'token'
                }, true)
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name removeToken
             * @description
             * Delete token from localstorage
             *
             * @returns {Boolean} for removing succeed
             */
            removeToken: function(where){
                console.log('removeToken',where)
                return localStorage.removeItem('token');
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name storeToken
             * @description
             * Store the token in localstorage
             *
             * @param {String} token From Api given token
             * @returns {Boolean} for setting succeed
             */
            storeToken: function(token){
                return localStorage.setItem('token', token);
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name getToken
             * @description
             * Retrieve the token from localstorage
             *
             * @returns {String} Token
             */
            getToken: function(){
                var token = localStorage.getItem('token');
                    console.log('getToken',token)
                return token;
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name createUser
             * @description
             * Create a user in database. Used by registration.
             *
             * @param {Object} data Compared object with userdata
             * @returns {Promise} for async handling
             */
            createUser: function(data){
                return cmApi.post({
                    path: '/account',
                    data: data
                })
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name checkAccountName
             * @description
             * Check in registration if the Username still not exists.
             *
             * @param {String} name Given username to check
             * @param {String} reservationSecret From api given token for Username
             * @returns {Promise} for async handling
             */
            checkAccountName: function(name, reservationSecret){
                return cmApi.post({
                    path: '/account/check',
                    data: {
                        loginName: name,
                        reservationSecret: reservationSecret
                    }
    //                exp_ok: 'reservationSecret',
    //                exp_ko: 'alternative'
                })
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name checkPhoneNumber
             * @description
             * Check if the given phonenumber is a valid one.
             *
             * @param {String} number Given phonenumber for validation
             * @returns {Promise} for async handling
             */
            checkPhoneNumber: function(number){
                return cmApi.post({
                    path: '/services/checkPhoneNumber',
                    data: { phoneNumber:number },
                    exp_ok: 'phoneNumber'
                })
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name getIdentity
             * @description
             * Get an identity from api
             *
             * @param {String} id Identity id for cmIdentityModel
             * @returns {Promise} async handling
             */
            getIdentity: function(id){
                return cmApi.get({
                    path: '/identity'+ (id ? '/'+id : '')
                })
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name savePublicKey
             * @description
             * saved a identity public key
             *
             * @param {Object} data Object with name, key & keySize
             * @returns {Promise} for async handling
             */
            savePublicKey: function(data){
                return cmApi.post({
                    path: '/identity/publicKey',
                    data: {
                        name: data.name,
                        key: data.key,
                        keySize: parseInt(data.keySize)
                    }
                })
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name removePublicKey
             * @description
             * removed a identity public key
             *
             * @param {String} keyId id of public key
             * @returns {Promise} for async handling
             */
            removePublicKey: function(keyId){
                return cmApi.delete({
                    path: '/identity/publicKey/'+keyId
                })
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name requestTwoFactorKey
             * @description
             * Two factor authentication
             *
             * @returns {Promise} for async handling
             */
            requestTwoFactorKey: function() {
                return cmApi.get({
                    path: '/twoFactorAuth'
                }, true)
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name requestTwoFactorToken
             * @description
             * Ask the api for a new authentication token
             *
             * @param {String} key Token for authentication
             * @returns {Promise} for async handling
             */
            requestTwoFactorToken: function(key){
                return cmApi.post({
                    path: '/twoFactorAuth/confirm',
                    data: { key: key },
                    exp_ok: "token"
                }, true)
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name removeTwoFactorToken
             * @description
             * Delete two factor token from localstorage
             *
             * @returns {Boolean} for removing succeed
             */
            removeTwoFactorToken: function(){
                return localStorage.removeItem('twoFactorToken');
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name storeTwoFactorToken
             * @description
             * Store the token in localstorage
             *
             * @param {String} twoFactorToken Token to store
             * @returns {Boolean} for setting succeed
             */
            storeTwoFactorToken: function(twoFactorToken){
                return localStorage.setItem('twoFactorToken', twoFactorToken);
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name getTwoFactorToken
             * @description
             * Retrieve thr token from localstorage
             *
             * @returns {String} twoFactorToken
             */
            getTwoFactorToken: function(){
                return localStorage.getItem('twoFactorToken');
            }
        };

        cmObject.addEventHandlingTo(auth);

        cmApi.on('identity:update', function (event, data){
//            console.log('cmAuth.on:identity:update')
            auth.trigger('identity:updated', data)
        });

        return auth;
    }
]);