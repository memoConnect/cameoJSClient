'use strict';

/**
 * @ngdoc service
 * @name cmAuthenticationRequest
 * @description
 * Handels authentication requests
 *
 * @requires cmApi
 * @requires localStorage TODO: implement ServiceLocalStorage
 */

angular.module('cmCore').service('cmAuthenticationRequest', [

    'cmApi',
    'cmObject', 
    'cmLogger', 
    'cmCrypt', 
    'cmUserModel',
    'cmIdentityFactory',
    'cmModal',
    'cmCallbackQueue',
    '$rootScope',


    function(cmApi, cmObject, cmLogger, cmCrypt, cmUserModel, cmIdentityFactory, cmModal, cmCallbackQueue, $rootScope){
        self = {
            /**
             * @ngdoc method
             * @methodOf cmAuthenticationRequest
             *
             * @name generateTransactionSecrete
             * @description
             * Generates a transaction seceret valid for a limited time
             */

            generateTransactionSecret: function(ttl){
                this.transactionSecret =    {
                                                content:    cmCrypt.generatePassword(8),
                                                expires:    new Date().getTime() + (ttl || 60000) 
                                            }
            },

            /**
             * @ngdoc method
             * @methodOf cmAuthenticationRequest
             *
             * @name getTransactionSecret
             * @description
             * Retrieves the transaction secret or null if expired
             *
             *  @return {* | null} transaction secret ir null if expired
             */
            
            getTransactionSecret: function(){
                return  this.transactionSecret && new Date().getTime() < this.transactionSecret.expires
                        ?   this.transactionSecret.content
                        :   null
            },

            /**
             * @ngdoc method
             * @methodOf cmAuthenticationRequest
             *
             * @name send
             * @description
             * Sends an Authentication Request to all devices of an identity
             *
             * @param {toIdentity} 
             * @param {secret} 
             * @param {fromkey} 
             * @returns {Promise} for async handling
             */
            send: function(toIdentity, secret, toKey, fromKey){
                var fromIdentity    =   cmUserModel.data.identity,
                    fromKey         =   fromKey || cmUserModel.loadLocalKeys()[0],
                    salt            =   cmCrypt.generatePassword(32)

                    

                cmCallbackQueue
                .push(function(){
                        return  cmCrypt.hashObject({
                                    transactionSecret:  secret,
                                    cameoId:            fromIdentity.cameoId,
                                    salt:               salt
                                })
                },100)
                .then(function(result){
                    var hashed_data = result[0]

                    return  cmCallbackQueue.push(function(){
                                return fromKey.sign(hashed_data)
                            }, 100)
                })
                .then(function(result){
                    var signature = result[0]

                    return cmApi.broadcast({
                            name:   'authenticationRequest:start',
                            data:   {
                                        fromKeyId:      fromKey.id,
                                        fromIdentityId: fromIdentity.id,
                                        toKeyId:        toKey ? toKey.id : undefined,
                                        salt:           salt,
                                        signature:      signature,
                                    }
                        }, toIdentity.id)

                })
            },

            /**
             * @ngdoc method
             * @methodOf cmAuthenticationRequest
             *
             * @name  cancel
             * @description
             * Cancels an Authentication Request on all devices of an identity
             *
             * @param {String} [signature]  The signature sent with the authenticationRequest that should be canceled
             * @returns {Promise}           Promise that will be resolved after the event is posted to the backend.
             */

            cancel: function(toIdentity){
                self.trigger('canceled')
                return  cmApi.broadcast({
                            name:   'authenticationRequest:cancel',
                            data:   {}
                        }, toIdentity.id)
            },


             /**
             * @ngdoc method
             * @methodOf cmAuthenticationRequest
             *
             * @name verify
             * @description
             * Verifies an Authentication Request
             *
             * @param {request} 
             * @returns {Boolean} wether or not the request is valid
             */
            verify: function(request, secret){
                var fromIdentity    =   cmIdentityFactory.find(request.fromIdentityId),
                    hashed_data     =   cmCrypt.hashObject({
                                            transactionSecret:  secret,
                                            cameoId:            fromIdentity.cameoId,
                                            salt:               request.salt
                                        }),
                    fromKey         =   fromIdentity.keys.find(request.fromKeyId),
                    result          =   fromKey.verify(hashed_data, request.signature)

                if(result)
                    self.trigger('verified', {
                        identity:           fromIdentity,
                        key:                fromKey,
                        transactionSecret:  secret,
                    })

                return result
            }
        }

        cmObject.addEventHandlingTo(self)

        cmApi.on('authenticationRequest:start', function(event, request){

            var modal       = cmModal.instances['incoming-authentication-request']

            //Prevent other authentication requests to interfere with an ongoing process
            if(modal && modal.isActive())
                return false

            var local_keys = cmUserModel.loadLocalKeys()

            //If there are no local keys, there's nothing to authenticate with:
            if(local_keys.length == 0 )
                return false

            //There is no need to authenticate local keys:
            if(local_keys.find(request.fromKeyId))
                return false
            
            //If a certain key was expected to sign, but that key is not present on this device, dont prompt the user:
            if(request.toKeyId && !local_keys.find(request.toKeyId))
                return false

            self.trigger('started', request)
        })

        cmApi.on('authenticationRequest:cancel', function(event, data){
            data.fromIdentityId = event.fromIdentityId
            console.dir(event)
            self.trigger('canceled', data)
        })

        self.on('started', function(event, request){

            var transactionSecret = self.getTransactionSecret()

            //If we already know the transaction secret, there is no need to prompt the user:
            if(transactionSecret){
                cmCallbackQueue.push(function(){
                    self.verify(request, transactionSecret)
                })
                return true
            }

            var scope   =   $rootScope.$new()

            scope.is3rdParty    =   request.fromIdentityId != cmUserModel.data.identity.id
            scope.fromIdentity  =   cmIdentityFactory.find(request.fromIdentityId)

            //If we dont know the identity that sent the request:
            if(!scope.fromIdentity)
                return false


            scope.error = {}

            scope.fromKey       =   scope.fromIdentity.keys.find(request.fromKeyId)
            scope.verify        =   function(secret){
                                        scope = this
                                        scope.error.emptyInput    = !secret
                                        scope.error.wrongSecret   = !scope.error.emptyInput && !self.verify(request, secret)

                                        if(!scope.error.emptyInput && !scope.error.wrongSecret){
                                            cmModal.close('incoming-authentication-request')
                                            cmUserModel
                                            .signPublicKey(scope.fromKey, scope.fromKey.id, scope.fromIdentity)
                                            .then(function(){
                                                //Send a request in return:
                                                self.send(
                                                    scope.fromIdentity,   //Sender of the initial requests
                                                    secret,               //The secret we successfully used during the last attempt
                                                    scope.fromKey         //The key that originally requested to be signed
                                                )                                                
                                            })
                                        }
                                    }

            cmModal.create({
                id:             'incoming-authentication-request',
                type:           'plain',
                'class':        'no-padding',
                'cm-close-btn': false,
                'cm-title':     scope.is3rdParty
                                ?   'IDENTITY.KEYS.TRUST.ENTER_TRANSACTION_SECRET.HEADER'
                                :   'IDENTITY.KEYS.AUTHENTICATION.ENTER_TRANSACTION_SECRET.HEADER'
            },'<cm-incoming-authentication-request></cm-incoming-authentication-request>', null, scope)

            cmModal.open('incoming-authentication-request')

            self.one('canceled', function(event, data){
                console.log(data.fromIdentityId)
                console.log(request.fromIdentityId)

                // If some other authentication request is meant to be canceled:
                if(data.fromIdentityId != request.fromIdentityId)
                    return false    // dont remove the event binding

                // Close Modal:
                var modal = cmModal.instances['incoming-authentication-request']
                if(modal && modal.isActive()){
                    cmModal.close('incoming-authentication-request')

                    cmModal.create({
                        id:             'authentication-request-canceled',
                        type:           'alert',
                        'cm-close-btn': false,
                    }, 'IDENTITY.KEYS.AUTHENTICATION.CANCELED')
                    cmModal.open('authentication-request-canceled')
                }
                
                return true     //remove the event binding
            })

        })

        return self
    }
])