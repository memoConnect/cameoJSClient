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
    '$q',

    function(cmApi, cmObject, cmLogger, cmCrypt, cmUserModel, cmIdentityFactory, cmModal, cmCallbackQueue, $rootScope, $q){

        var self = {
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
             *  @return {* | null} transaction secret or null if expired
             */
            
            getTransactionSecret: function(){
                return  this.transactionSecret && (new Date().getTime() < this.transactionSecret.expires)
                        ?   this.transactionSecret.content
                        :   null
            },

            /**
             * @ngdoc method
             * @methodOf cmAuthenticationRequest
             *
             * @name getTTL
             * @description
             * Retrieves time to the expireation of the transaction secret
             *
             *  @return {Number} Time to expiration of transaction secret in milliseconds or 0, whatever ist greater
             */
            getTTL: function(){
                  return    (
                                    this.transactionSecret 
                                &&  Math.max(0, this.transactionSecret.expires - (new Date().getTime()))
                            )   ||  0
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
            send: function(toIdentityId, secret, toKeyId, fromKeyId){
                var fromIdentity    =   cmUserModel.data.identity,
                    fromKey         =   cmUserModel.loadLocalKeys().find(fromKeyId) || cmUserModel.loadLocalKeys()[0],
                    salt            =   cmCrypt.generatePassword(32)

                    

                return  cmCallbackQueue
                        .push(function(){
                            return  cmCrypt.hashObject({
                                        transactionSecret:  secret,
                                        cameoId:            fromIdentity.cameoId,
                                        salt:               salt
                                    })
                        },100)  // Leave the browser a tiny bit of time to breathe
                        .then(function(result){
                            return  cmCallbackQueue.push(function(){

                                        // if succesful result[0] contains hashed data returned by cmCrypt.hashObject
                                        return fromKey.sign(result[0])   

                                    }, 100) // Leave the browser a tiny bit of time to breathe
                        })
                        .then(function(result){

                            // if succesful result[0] contains the signature returned by fromKey.sign
                            return cmApi.broadcast({
                                    name:   'authenticationRequest:start',
                                    data:   {
                                                fromKeyId:      fromKey.id,
                                                fromIdentityId: fromIdentity.id,
                                                toKeyId:        toKeyId, // may be undefined
                                                salt:           salt,
                                                signature:      result[0],  
                                            }
                                }, toIdentityId)

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

            cancel: function(toIdentityId){
                if(!typeof toIdentityId == 'string'){
                    cmLogger.debug('cmAuthenticationRequest: cancel() toIdentityId must be string.')
                    return false
                }
                
                self.trigger('canceled');
                delete this.transactionSecret;

                return  cmApi.broadcast({
                            name:   'authenticationRequest:cancel',
                            data:   {}
                        }, toIdentityId);
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
                    fromKey         =   fromIdentity.keys.find(request.fromKeyId);


                return  fromKey.verify(hashed_data, request.signature)
                        .then(
                            function(result){
                                self.trigger('verification:successful', {
                                        identity:           fromIdentity,
                                        key:                fromKey,
                                        transactionSecret:  secret
                                });
                                return $q.when(result);
                            },
                            function(reason){
                                self.trigger('verification:failed');
                                return $q.reject(reason);
                            }
                        )
            },

            //Todo: maybe find a more suitabble place for this function:
            openBulkRequest: function(data){

                if(typeof data == 'object' && 'key1' in data && 'key2' in data){
                    var scope = $rootScope.$new();
                    scope.data = data;

                    var modalId = 'bulk-rekeying-modal';
                    cmModal.create({
                        id: modalId,
                        type: 'plain',
                        'class': 'no-padding',
                        'cm-title': 'DRTV.BULK_REKEYING.HEADER'
                    },'<cm-bulk-rekeying-request></cm-bulk-rekeying-request>',null,scope);

                    cmModal.open(modalId);

                    cmUserModel.one('bulkrekeying:finished',function(){
                        $rootScope.closeModal(modalId);
                    });
                }
            }
        };

        cmObject.addEventHandlingTo(self);


        /**
         * Listen to Api events. When a start event occurs, check wether it is relevant for the current user.
         * If so trigger a local event in cmAuthenticationRequest.
         */

        cmApi.on('authenticationRequest:start', function(event, request){

            var local_keys = cmUserModel.loadLocalKeys();

            // If there are no local keys, there's nothing to authenticate with:
            if(local_keys.length == 0 ){
                cmLogger.debug('cmAuthenticationRequest: received request, but no local keys present.');
                return false; // do not remove event binding
            }


            // There is no need to authenticate local keys:
            if(local_keys.find(request.fromKeyId)){
                cmLogger.debug('cmAuthenticationRequest: received request, but key to be signed is local.')
                return false // do not remove event binding
            }
            

            // If a certain key was expected to sign, but that key is not present on this device, dont prompt the user:
            if(request.toKeyId && !local_keys.find(request.toKeyId)){
                cmLogger.debug('cmAuthenticationRequest: received request, but requested private key to sign with is not present.')
                return false // do not remove event binding
            }

            var fromIdentity = cmIdentityFactory.find(event.fromIdentityId)

            if(!fromIdentity){
                cmLogger.debug('cmAuthenticationRequest: received request, but sender is unknown.')
                return false // do not remove event binding
            }

            //If we dont know the key to sign:
            if(!fromIdentity.keys.find(request.fromKeyId)){
                cmLogger.debug('cmAuthenticationRequest: received request, key to be signed not at the proper identity.')
                return false // do not remove event binding
            }

            self.trigger('started', request)
        })


        /**
         * Listen to Api events. When a cancel event occurs, force sender into data object and trigger local event.
         * It is important to know the sender so that 3rd party identities cannot cancel your events. 
         */
        cmApi.on('authenticationRequest:cancel', function(event, data){
            data = data || {}
            data.fromIdentityId = event.fromIdentityId
            self.trigger('canceled', data)
        })

        /**
         * Listen to events on cmAuthenticationRequest.
         */

        self.on('started', function(event, request){

            //Prevent other authentication requests to interfere with an ongoing process:
            var modal = cmModal.instances['incoming-authentication-request']

            if(modal && modal.isActive()){
                // If request comes from the same origin as the ongoing request then update:
                if(modal.request.fromIdentityId == request.fromIdentityId)
                    modal.request = request
                
                return false // do not remove event binding
            }


            // Close other authentication request related modals:
            cmModal.close('authentication-request-successful')
            cmModal.close('authentication-request-canceled')


            var transactionSecret = self.getTransactionSecret()


            // If we already know the transaction secret, there is no need to prompt the user:
            if(transactionSecret){
                cmCallbackQueue.push(function(){
                    self.verify(request, transactionSecret)
                })
                return false // do not remove event binding
            }


            /** Use a modal from here on **/


            // new scope for a modal to open below
            var modal_scope   =   $rootScope.$new(),
                is3rdParty    =   request.fromIdentityId != cmUserModel.data.identity.id,
                fromIdentity  =   cmIdentityFactory.find(request.fromIdentityId),
                fromKey       =   fromIdentity.keys.find(request.fromKeyId)


            
            modal_scope.error   =   {}    
            modal_scope.request =   request     //stored for later use, if another authentication request with the same origin occurs

            modal_scope.verify  =   function(secret){
                                        var scope = this
                                        scope.error.emptyInput    = !secret
                                        scope.error.wrongSecret   = !scope.error.emptyInput && !self.verify(scope.request, secret)

                                        $q.reject()
                                        .catch(function(){
                                            return  scope.error.emptyInput
                                                    ?   $q.reject('empty input.')
                                                    :   self.verify(scope.request, secret)
                                        })
                                        .catch(function(error){
                                            scope.error.wrongSecret = true
                                            return $q.reject('verification failed.')
                                        })
                                        .then(function(res){
                                            // Modal is no longer needed:
                                            cmModal.close('incoming-authentication-request')



                                            // Double check and make sure that only the key gets signed that was actually verified above:
                                            // Also: We need variables, because scope gets destroyed once the modal is closed.
                                            var fromIdentity    =   cmIdentityFactory.find(scope.request.fromIdentityId),
                                                fromKey         =   fromIdentity.keys.find(scope.request.fromKeyId),
                                                is3rdParty      =   fromIdentity != cmUserModel.data.identity,
                                                toKey           =   (
                                                                            scope.request.toKeyId 
                                                                        &&  cmUserModel.loadLocalKeys().find(scope.request.toKeyId)
                                                                    )   
                                                                    ||  cmUserModel.loadLocalKeys()[0]
                                                                    

                                            return      fromIdentity    == scope.fromIdentity
                                                    &&  fromKey         == scope.fromKey

                                                    ?   cmUserModel.signPublicKey(fromKey, fromKey.id, fromIdentity)
                                                        .then(function(){
                                                            return  $q.when({
                                                                        fromIdentity:   fromIdentity,
                                                                        fromKey:        fromKey,
                                                                        toKey:          toKey,
                                                                        secret:         secret
                                                                    })
                                                        })
                                                    :   $q.reject('double check failed.')
                                                    
                                        })
                                        .then(function(data){

                                            if(is3rdParty === false){

                                                /*
                                                // Open modal for bulk rekeying:
                                                self.openBulkRequest({
                                                    key1: toKey.id,
                                                    key2: fromKey.id
                                                })
                                                */

                                                cmUserModel.bulkReKeying(data.toKey.id, data.fromKey.id)

                                                
                                            }else{

                                                /*
                                                // Open success Modal:
                                                cmModal.create({
                                                    id:             'authentication-request-successful',
                                                    type:           'alert',
                                                    'cm-close-btn': false,
                                                },  
                                                    is3rdParty
                                                    ?   '{{"IDENTITY.KEYS.TRUST.MODAL.SUCCESS"|cmTranslate}}'
                                                    :   '{{"IDENTITY.KEYS.AUTHENTICATION.MODAL.SUCCESS"|cmTranslate}}'
                                                )

                                                cmModal.open('authentication-request-successful')
                                                */
                                            }

                                            //Send a request in return:
                                            self.send(
                                                data.fromIdentity.id,    //Sender of the initial requests
                                                data.secret,             //The secret we successfully used during the last attempt
                                                data.fromKey.id          //The key that originally requested to be signed
                                            )                                                
                                        })
                                    }
            cmModal.create({
                id:             'incoming-authentication-request',
                type:           'plain',
                'class':        'no-padding',
                'cm-close-btn': false,
                'cm-title':     is3rdParty
                                ?   'IDENTITY.KEYS.TRUST.ENTER_TRANSACTION_SECRET.HEADER'
                                :   'IDENTITY.KEYS.AUTHENTICATION.ENTER_TRANSACTION_SECRET.HEADER'
            },'<cm-incoming-authentication-request></cm-incoming-authentication-request>', null, modal_scope)

            cmModal.open('incoming-authentication-request')

            /**
             * Listen to local events. Wait for a cancel event to close the Modal.
             */


            self.one('canceled', function(event, data){
                var modal = cmModal.instances['incoming-authentication-request']

                // If some other authentication request is meant to be canceled:
                if(modal && data && (modal.request.fromIdentityId != data.fromIdentityId)){
                    cmLogger.debug('cmAuthenticationRequest, received cancel event, but with different origin or inactive modal.')
                    return false    // dont remove the event binding
                }

                // Only show the cancelation modal if a authentication modal was actually present:
                if(modal && modal.isActive()){
                    cmModal.close('incoming-authentication-request')

                    cmModal.create({
                        id:             'authentication-request-canceled',
                        type:           'alert',
                        'cm-close-btn': false
                    },  is3rdParty
                        ?   '{{"IDENTITY.KEYS.TRUST.MODAL.CANCELED"|cmTranslate}}'
                        :   '{{"IDENTITY.KEYS.AUTHENTICATION.MODAL.CANCELED"|cmTranslate}}')

                    cmModal.open('authentication-request-canceled', null, 2000)

                    return true     //remove the event binding
                }

                return false
                
            })

        })

        return self
    }
])