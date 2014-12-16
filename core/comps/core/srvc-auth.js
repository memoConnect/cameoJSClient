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

angular.module('cmCore')
    .service('cmAuth', [
    'cmApi','LocalStorageAdapter', 'cmObject', 'cmUtil', 'cmLogger', 'cmCrypt' ,'$rootScope',
    function(cmApi, LocalStorageAdapter, cmObject, cmUtil, cmLogger, cmCrypt, $rootScope){
        var _TOKEN_ = undefined;
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
                var auth = cmCrypt.base64Encode(login + ":" + pass);

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
             * Remove token from LocalStorage
             * Reset validate Token
             *
             * @returns {Boolean} for removing succeed
             */
            removeToken: function(where){
                cmLogger.debug('cmAuth.removeToken');

                /* reset validate Token */
                _TOKEN_ = undefined;

                /* remove Token from LocalStorage */
                LocalStorageAdapter.remove('token');
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
             * @param {Boolean} froce Force storeToken
             * @returns {Boolean} for setting succeed
             */
            storeToken: function(token, force){
                //cmLogger.debug('cmAuth.storeToken');

                if(typeof force != 'undefined' && force == true){
                    _TOKEN_ = token;
                    return LocalStorageAdapter.save('token', token);
                } else {
                    if(_TOKEN_ == undefined || _TOKEN_ == token){
                        _TOKEN_ = token;

                        var bool;
                        try {
                            bool = LocalStorageAdapter.save('token', token);
                        } catch(e){
                            cmLogger.warn('cmAuth.storeToken - Local Storage Error')
                        }

                        //return localStorage.setItem('token', token)/
                        return bool;
                    } else if(_TOKEN_ != token) {
                        cmLogger.debug('cmAuth.storeToken - Error - validateToken is different')
                    }
                }
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
                //cmLogger.debug('cmAuth.getToken')

                var token;

                try {
                    token = LocalStorageAdapter.get('token');

                    if(token !== undefined && token !== 'undefined' && token !== null && token.length > 0){
                        if(_TOKEN_ != undefined && _TOKEN_ != token){
                            $rootScope.$broadcast('logout',{where: 'cmAuth getToken failure'});
                            cmLogger.debug('cmAuth.storeToken - Error - validateToken is different');

                            return false;
                        }
                    } else {
                        if(_TOKEN_ != undefined){
                            this.storeToken(_TOKEN_);
                            token = _TOKEN_;
                        }
                    }
                } catch (e){
                    cmLogger.warn('cmAuth.getToken - Local Storage Error')
                }

                return token;
            },

            getIdentityToken: function(identityId){
                return cmApi.get({
                    path: '/identity/'+identityId+'/token'
                })
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
             * @name checkMixed
             * @description
             * Check if the given string is either a valid phone number or a valid e-mail address
             *
             * @param {String} string to validate
             * @returns {Promise} for async handling
             */

            checkMixed: function(mixed) {
                return cmApi.post({
                    path: '/services/checkMixed',
                    data: { mixed:mixed }
                })
            },

            getAccount: function(){
                return cmApi.get({
                    path: '/account'
                })
            },

            putAccount: function(data){
                return cmApi.put({
                    path: '/account',
                    data: data
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
             * @name updateIdentity
             * @description
             * Update own Identity
             *
             * @param {Object} data Identity Parameter
             * @returns {Promise} async handling
             */
            updateIdentity: function(data){
                return cmApi.put({
                    path: '/identity',
                    data: data
                })
            },

            addIdentity: function(data){
                return cmApi.post({
                    path: '/identity',
                    data: data
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
                    path: '/publicKey',
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
                    path: '/publicKey/'+keyId
                })
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name savePublicKeySignature
             * @description
             * save a signature to a public key
             *
             * @param {String} keyId id of local key
             * @param {String} signKeyId id of signed key
             * @param {String} signature signature
             * @returns {Promise} for async handling
             */
            savePublicKeySignature: function(localKeyId, signKeyId, signature){
                return cmApi.post({
                    path: '/publicKey/' + signKeyId + '/signature',
                    data: {
                        keyId: localKeyId,
                        content: signature
                    }
                });
            },

            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name getBulkPassphrases
             * @description
             * get aePassphraseList for reKeying
             *
             * @param {String} keyId id of local key
             * @param {String} newKeyId id of new public key
             * @param {Integer} limit maximum answers in list
             * @returns {Promise} for async handling
             */
            getBulkPassphrases: function(keyId, newKeyId, limit){
                var queryString = cmUtil.handleLimitOffset(limit);

                if(queryString == ''){
                    queryString += '?newKeyId=' + newKeyId;
                } else {
                    queryString += '&newKeyId=' + newKeyId;
                }

                return cmApi.get({
                    path: '/publicKey/'+ keyId +'/aePassphrases' + queryString
                });
            },
            /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name saveBulkPassphrases
             * @description
             * post new aePassphraseList for conversation
             *
             * @param {String} keyId id of public key
             * @param {Object} data new asymmetric encrypted passphrases
             * @returns {Promise} for async handling
             */
            saveBulkPassphrases: function(keyId, data){
                return cmApi.post({
                    path: '/publicKey/'+ keyId +'/aePassphrases',
                    data: data
                });
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
            },

            sendPasswordLost: function(data){
                return cmApi.post({
                    path: '/resetPassword',
                    data: data
                });
            },

            checkResetPassword: function(resetId){
                return cmApi.get({
                    path: '/resetPassword/'+resetId
                });
            },

            resetPassword: function(data, resetId){
                return cmApi.post({
                    path: '/resetPassword/'+resetId,
                    data: data
                });
            },

            sendVerification: function(type){
                var data = {};

                switch(type){
                    case 'phoneNumber':
                        data.verifyPhoneNumber = true;
                    break;
                    case 'email':
                        data.verifyEmail = true;
                    break;
                }

                cmApi.post({
                    path: '/verify',
                    data: data
                })
            },

            confirmVerification: function(secret){
                return cmApi.post({
                    path: '/verify/'+secret
                });
            }
        };

        cmObject.addEventHandlingTo(auth);

        cmApi.on('identity:update', function (event, data){
            //cmLogger.debug('cmAuth.on:identity:update')
            auth.trigger('identity:updated', data);
        });

        cmApi.on('identity:new', function (event, data){
            //cmLogger.debug('cmAuth.on:identity:new')
            auth.trigger('identity:new', data);
        });

        cmApi.on('conversation:new-aePassphrase', function(event, data){
            //cmLogger.debug('cmAuth.on:conversation:new-aePassphrase');
            auth.trigger('conversation:update', data);
        });

        cmApi.on('account:update', function (event, data){
            //cmLogger.debug('cmAuth.on:account:update')
            auth.trigger('account:update', data);
        });

        return auth;
    }
]);