define([
    'app',
    'util-base64',
    'util-passchk-fast',
    'cmCrypt',
    'mUser'
], function (app) {
    'use strict';

//    var cmAuth = angular.module('cmAuth', ['ngCookies', 'cmApi', 'cmCrypt', 'cmLogger'])

    // Service to handle all authenticateion matters
    app.register.factory('cmAuth', [
        'cmApi',
        'cmCrypt',
        'cmLogger',
        '$cookieStore',
        '$q',
        function(cmApi, cmCrypt, cmLogger, $cookieStore){
            return {

                //ask the api for a new authentication token:
                requestToken: function(login, pass){
                    var auth = Base64.encode(login + ":" + cmCrypt.hash(pass));

                    return cmApi.get({
                        url: '/token',
                        headers: { 'Authorization': 'Basic '+auth } ,
                        exp_ok: 'token'
                    })
                },

                //delete Token
                removeToken: function(){
                    return $cookieStore.remove("token");
                },

                //store the token in a cookie:
                storeToken: function(token){
                    return $cookieStore.put("token", token);
                },

                //retrieve thr token from a cookie
                getToken: function(){
                    return $cookieStore.get('token');
                },

                createUser: function(data){
                    return cmApi.post({
                        url: '/account',
                        data: data
                    })
                },

                checkAccountName: function(name, reservationSecret){
                    return cmApi.post({
                        url: '/account/check',
                        data: {
                            loginName: name,
                            reservationSecret: reservationSecret
                        },
                        exp_ok: 'reservationSecret',
                        exp_ko: 'alternative'
                    })
                },

                checkPhoneNumber: function(number){
                    return cmApi.post({
                        url: '/services/checkPhoneNumber',
                        data: { phoneNumber:number },
                        exp_ok: 'phoneNumber'
                    })
                },

                getIdentity: function(id){
                    return cmApi.get({
                        url: '/identity'+ (id ? '/'+id : '')
                    })
                }
            }
        }
    ]);
    return app;
});