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
    'cmContactsModel',


    function(cmApi, cmObject, cmLogger, cmCrypt, cmUserModel, cmContactsModel){
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
                                                content:    cmCrypt.generatePassword(32),
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
                return  new Date().getTime() < this.transactionSecret.expires
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
                var fromIdentity    =   cmContactsModel.findByIdentityId(request.fromIdentityId).identity,
                    hashed_data     =   cmCrypt.hashObject({
                                            transactionSecret:  secret,
                                            cameoId:            fromIdentity.cameoId,
                                            salt:               request.salt
                                        }),
                    fromKey         =   fromIdentity.keys.find(fromKeyId)

                return  fromKey.verify(hashed_data, request.signature)
            } 
        }

        cmObject.addEventHandlingTo(self)

        cmApi.on('authenticationRequest:start', function(event, request){

            var modal = cmModal.instances['incoming-authentication-request']
        
            //Prevent other authentication requests to interfer with ongoing process
            if(modal && modal.isActive())
                return false


            //There is no need to authenticate local keys:
            if(cmUserModel.loadLocalKeys().find(request.fromKeyId))
                return false

            var transactionSecret = self.getTransactionSecret()
            //If we already know the transaction secret, there is no need to prompt the user:
            if(transactionSecret){
                if(self.verify(request, secret))
                    console.log('passt, auto')
                return true
            }


            var scope = $rootScope.$new()

            scope.is3rdParty    =   request.identityId != cmUserModel.data.identity.id
            scope.fromIdentity  =   scope.is3rdParty
                                    ?   cmContactsModel.findByIdentityId(request.identityId)
                                    :   cmUserModel.data.identity
            scope.fromKey       =   scope.fromIdentity.keys.find(request.keyId)
            scope.verify        =   function(secret){
                                        if(self.verify(request, secret))
                                            console.log('passt')
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
            .open(modalId);        
        })

        return self
    }
])