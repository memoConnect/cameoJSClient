'use strict';

angular.module('cmCore')
.service('cmAuth', [

    'cmApi',
    
    function(cmApi){
        return {

            // ask the api for a new authentication token:
            requestToken: function(login, pass){
                var auth = _Base64.encode(login + ":" + pass);

                return cmApi.get({
                    path: '/token',
                    headers: { 'Authorization': 'Basic '+auth } ,
                    exp_ok: 'token'
                }, true)
            },

            // delete Token
            removeToken: function(){
                return localStorage.removeItem('token');
            },

            // store the token in a cookie:
            storeToken: function(token){
                return localStorage.setItem('token', token);
            },

            // retrieve thr token from a cookie
            getToken: function(){
                return localStorage.getItem('token');
            },

            createUser: function(data){
                return cmApi.post({
                    path: '/account',
                    data: data
                })
            },

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

            checkPhoneNumber: function(number){
                return cmApi.post({
                    path: '/services/checkPhoneNumber',
                    data: { phoneNumber:number },
                    exp_ok: 'phoneNumber'
                })
            },

            getIdentity: function(id){
                return cmApi.get({
                    path: '/identity'+ (id ? '/'+id : '')
                })
            },

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

            // two factor authentication
            requestTwoFactorKey: function() {
                return cmApi.get({
                    path: '/twoFactorAuth'
                }, true)
            },

            // ask the api for a new authentication token:
            requestTwoFactorToken: function(key){
                return cmApi.post({
                    path: '/twoFactorAuth/confirm',
                    data: { key: key },
                    exp_ok: "token"
                }, true)
            },

            // delete Token
            removeTwoFactorToken: function(){
                return localStorage.removeItem('twoFactorToken');
            },

            // store the token in a cookie:
            storeTwoFactorToken: function(twoFactorToken){
                return localStorage.setItem('twoFactorToken', twoFactorToken);
            },

            // retrieve thr token from a cookie
            getTwoFactorToken: function(){
                return localStorage.getItem('twoFactorToken');
            }

        }
    }]);