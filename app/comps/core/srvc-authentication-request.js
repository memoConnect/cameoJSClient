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
    '$rootScope',


    function(cmApi, cmObject, cmLogger, cmCrypt, cmUserModel, cmIdentityFactory, cmModal, $rootScope){
        self = {
            /**
             * @ngdoc method
             * @methodOf cmAuth
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
             * @methodOf cmAuth
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
             * @methodOf cmAuth
             *
             * @name sendAuthenticationRequest
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
                    salt            =   cmCrypt.generatePassword(32),
                    hashed_data     =   cmCrypt.hashObject({
                                            transactionSecret:  secret,
                                            cameoId:            fromIdentity.cameoId,
                                            salt:               salt
                                        })
                    
                return  cmApi.broadcast({
                            name:   'authenticationRequest:start',
                            data:   {
                                        fromKeyId:      fromKey.id,
                                        fromIdentityId: fromIdentity.id,
                                        toKeyId:        toKey ? toKey.id : undefined,
                                        salt:           salt,
                                        signature:      fromKey.sign(hashed_data),
                                    }
                        }, toIdentity.id)
            },

             /**
             * @ngdoc method
             * @methodOf cmAuth
             *
             * @name verifyAuthenticationRequest
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

            var modal = cmModal.instances['incoming-authentication-request']
        
            //Prevent other authentication requests to interfer with ongoing process
            if(modal && modal.isActive())
                return false

            console.log(1)
            //There is no need to authenticate local keys:
            if(cmUserModel.loadLocalKeys().find(request.fromKeyId))
                return false

            var transactionSecret = self.getTransactionSecret()

            console.log(2)
            //If we already know the transaction secret, there is no need to prompt the user:
            if(transactionSecret){
                self.verify(request, transactionSecret)
                return true
            }

            console.log(3)

            //If a certain key was expected to sign, but that key is not present on this device, dont prompt the user:
            if(request.toKeyId && !cmUserModel.loadLocalKeys().find(request.toKeyId))
                return false

            console.log(4)

            var scope   =   $rootScope.$new()

            scope.is3rdParty    =   request.fromIdentityId != cmUserModel.data.identity.id
            scope.fromIdentity  =   cmIdentityFactory.find(request.fromIdentityId)

            //If we dont know the identity that sent the request:
            if(!scope.fromIdentity)
                return false

            scope.fromKey       =   scope.fromIdentity.keys.find(request.fromKeyId)
            scope.verify        =   function(secret){
                                        scope.error = !self.verify(request, secret)
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
        })

        self.on('verified', function(event, data){
            cmUserModel.signPublicKey(data.key, data.key.id, data.identity)
            cmModal.close('incoming-authentication-request')

            //Send a request in return:
            cmAuthenticationRequest.send(
                cmUserModel.data.identity,  //Ourself
                data.transactionSecret,     //The secret we used during the last attempt
                data.fromKey                //The key that should sign our ownkey; may be undefined
            )
        })

        return self
    }
])