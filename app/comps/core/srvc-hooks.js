'use strict';

angular.module('cmCore').service('cmHooks', [
    'cmUserModel', 'cmObject', 'cmApi', 'cmModal', 'cmLogger',
    'cmAuthenticationRequestFactory', 'cmAuthenticationRequestModel', 'cmUtil', 'cmKey',
    '$location', '$rootScope',
    function(cmUserModel, cmObject, cmApi, cmModal, cmLogger,
             cmAuthenticationRequestFactory, cmAuthenticationRequestModel, cmUtil, cmKey,
             $location, $rootScope){
        var self = this;
        cmObject.addEventHandlingTo(this);

        this.openBulkRequest = function(data){
//            cmLogger.debug('cmHooks.openBulkRequest');

            if(typeof data == 'object' && cmUtil.checkKeyExists(data,'key1') && cmUtil.checkKeyExists(data, 'key2')){
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


                cmUserModel.on('bulkrekeying:finished',function(){
                    $rootScope.closeModal('bulk-rekeying-modal');
                });
            }
        };

        this.openKeyRequest = function(){
//            cmLogger.debug('cmHooks.openKeyRequest');

            var authenticationRequest = cmAuthenticationRequestFactory.create();
            authenticationRequest.state.set('outgoing');

            var scope = $rootScope.$new();
            scope.authenticationRequest = authenticationRequest;

            var modalId = 'key-request';
            cmModal.create({
                id: modalId,
                type: 'plain',
                'class': 'no-padding',
                'cm-title': 'DRTV.KEY_REQUEST.HEADER'
            },'<cm-key-request></cm-key-request>',null,scope);
            cmModal.open(modalId);
        };

        this.openOutgoingAuthenticationRequest = function(authenticationRequest){
            cmLogger.debug('cmHooks.openOutgoingAuthenticationRequest');

            if(authenticationRequest instanceof cmAuthenticationRequestModel){
                var scope = $rootScope.$new();
                scope.authenticationRequest = authenticationRequest;

                var modalId = 'outgoing-authentication-request';
                cmModal.create({
                    id: modalId,
                    type: 'plain',
                    'class': 'no-padding',
                    'cm-close-btn': false,
                    'cm-title': 'SETTINGS.PAGES.IDENTITY.HANDSHAKE.MODAL_HEADER'
                },'<cm-outgoing-authentication-request></cm-outgoing-authentication-request>', null, scope);
                cmModal.open(modalId);

                cmModal.on('modal:closed', function(event, id){
                    if(id == modalId){
//                        console.log('Andreas hats drauf!')
                    }
                });

                authenticationRequest.one('request:finished', function(){
                    $rootScope.closeModal(modalId);
                    cmAuthenticationRequestFactory.deregister(authenticationRequest);
                });
            }
        };

        /**
         * authenticationRequest:new
         */
        cmApi.on('authenticationRequest:start', function(event, request){
//            cmLogger.debug('cmHooks.on:authenticationRequest:start');

//            var requestMock = {
//                signature: "022724e66002cefc6f59cb6a8fbf8f5add1667df7623bfaf67e49ddeaca10d68032183118e2c89007fd1c66f93ab35cdb67829a939837d754a0898f6fab3bf94993fe765522489dd5cdbfaf66ebee0418c2719f1e4d45228c03d738aec1265005361521c4009196aa6eb8bc4108395f9cd6b60dea4c92d131cb9090359fb82da92064617f651475fff38bc3e526c8eb8e181fbd6a5c78956360f207f359d02b089c149324bd29ebd534f3a2ac4d9ed19aa7cd04dad914d7469ee7880e8fe86323314c2c8e450e0c9b14843a3f59ef9b2b64a566ea8d5eb88bac18e11a4011b3f52b15cd3871ae92d805d4afde83b95da2cf18c7f5b13973fb57fad55bd0f2f61",
//                encryptedTransactionSecret: "XQAgqCtu3TaB/+Gd9ynPyjaMM10UGii0xXP8dX3YbeS30HwgjYaPhGLO3z19tO/qHkejEmw2jYDHYHD5pB6lJOEPJQ9pY0JMrva5KBneXAzKyPcbjcAdbZGkwqCzrBKoXq1uuRrt6pE8wAfdshzgQonS0CMPFVT/VE6NVmeoZe6e1yi3ZaZwUejyzw+rpHcnKLbhyCF7fS/sj8L6hlSc4b7NSDpaz567ZradfduHXGiIVqOZWjPcNkPotn/t5GYbnyg84J0GXUVYBn+6WQ7NOlfPb3ENkquVkXpI7aTLtZRtvB9upuYfUzngkPCQLU/quMvZI4AiidKaBui9uX18Kw==",
//                fromKeyId: "0CboIaFvURzalSOC7Wz3",
//                toKeyId: "4UEYJBBcC8UCIn8flmGV",
//                id: 'wskxK6QoSprH1ambvpe8',
//                created: 1406280637301
//            };

            var authenticationRequest = cmAuthenticationRequestFactory.find(request);

            if(cmAuthenticationRequestFactory.find(request) == null) {
                authenticationRequest = cmAuthenticationRequestFactory.create(request);
                authenticationRequest.state.set('incoming');
            } else {
                authenticationRequest.importData(request);
            }

            if(authenticationRequest.state.is('incoming') && authenticationRequest.verifyIncomingRequest() !== false){
                var scope = $rootScope.$new();
                scope.authenticationRequest = authenticationRequest;

                var modalId = 'incoming-authentication-request';
                cmModal.create({
                    id: modalId,
                    type: 'plain',
                    'class': 'no-padding',
                    'cm-close-btn': false,
                    'cm-title': 'SETTINGS.PAGES.IDENTITY.HANDSHAKE.MODAL_HEADER'
                },'<cm-incoming-authentication-request></cm-incoming-authentication-request>', null, scope);
                cmModal.open(modalId);

                cmModal.on('modal:closed', function(event, id){
                    if(id == modalId){
                        cmAuthenticationRequestFactory.deregister(authenticationRequest);
                }
                });

                authenticationRequest.on('request:finished', function(){
                    var bulkData = authenticationRequest.exportKeyIdsForBulk();

                    cmAuthenticationRequestFactory.deregister(authenticationRequest);

                    self.openBulkRequest(bulkData);
                });
            }
        });

        cmApi.on('authenticationRequest:verified', function(event, request) {
//            cmLogger.debug('cmHooks.on:authenticationRequest:verified');

            var authenticationRequest = cmAuthenticationRequestFactory.find(request);

            if(authenticationRequest !== null && (typeof authenticationRequest.finish == 'function')){

                if(authenticationRequest.state.is('outgoing')){
                    authenticationRequest.finish();

                    authenticationRequest.on('request:finished', function(){
                        var bulkData = authenticationRequest.exportKeyIdsForBulk();

                        cmAuthenticationRequestFactory.deregister(authenticationRequest);

                        self.openBulkRequest(bulkData);
                    });
                }
            }
        });

        cmApi.on('authenticationRequest:canceled', function(event, request) {
//            cmLogger.debug('cmHooks.on:authenticationRequest:canceled');

            var authenticationRequest = cmAuthenticationRequestFactory.find(request);
            if(authenticationRequest !== null){
                cmAuthenticationRequestFactory.deregister(authenticationRequest);
            }
        });

        cmApi.on('authenticationRequest:key-request', function(event, request){
//            cmLogger.debug('cmHooks.authenticationRequest:key-request');

            if(cmAuthenticationRequestFactory.find(request) == null && cmUserModel.loadLocalKeys().length > 0){
                var authenticationRequest = cmAuthenticationRequestFactory.create(request);
                authenticationRequest.state.set('incoming');

                var scope = $rootScope.$new();
                scope.authenticationRequest = authenticationRequest;

                var modalId = 'key-response';
                cmModal.create({
                    id: modalId,
                    type: 'plain',
                    'class': 'no-padding',
                    'cm-title': 'DRTV.KEY_RESPONSE.HEADER'
                },'<cm-key-response></cm-key-response>',null,scope);
                cmModal.open(modalId);

                cmModal.on('modal:closed', function(event, id){
                    if(id == modalId){
//                        $rootScope.keyRequestSender = false;
                    }
                });
            }
        });

        cmApi.on('authenticationRequest:key-response', function(event, response){
//            cmLogger.debug('cmHooks.authenticationRequest:key-response');

            if(typeof response == 'object'
                && "id" in response
                && "toKeyId" in response
                && "toKeyFingerprint" in response
            ){
                var authenticationRequest = cmAuthenticationRequestFactory.find(response);

                if(authenticationRequest !== null && authenticationRequest.state.is('outgoing')){
                    $rootScope.closeModal('key-request');
                    authenticationRequest.importKeyResponse(response);
                } else {
                    $rootScope.closeModal('key-response');
                }
            } else {
//                console.log("cmHooks.authenticationRequest:key-response - fail");
                $rootScope.closeModal('key-response');
            }
        });

        cmUserModel.on('handshake:start', function(event, toKey){
            if(cmUserModel.verifyPublicKeyForAuthenticationRequest(toKey)){

                var authenticationRequest = cmAuthenticationRequestFactory.create();
                authenticationRequest.state.set('outgoing');

                authenticationRequest.setToKey(toKey);

                self.openOutgoingAuthenticationRequest(authenticationRequest);
            }
        });

        cmUserModel.on('key:saved ', function(){
//            console.log('cmHooks - key:saved');

            var localKeys = cmUserModel.loadLocalKeys();
            var publicKeys = cmUserModel.data.identity.keys;

            if(localKeys.length < publicKeys.length){
                self.openKeyRequest();
            }
        });

        cmAuthenticationRequestFactory.on('key-response:accepted', function(event, data){
//            cmLogger.debug('cmHooks - cmAuthenticationRequestFactory.on:key-response:accepted');

            if(typeof data == 'object' || typeof data == 'string'){
                var authenticationRequest = cmAuthenticationRequestFactory.find(data);
                if(authenticationRequest !== null){
                    self.openOutgoingAuthenticationRequest(authenticationRequest);
                }
            }
        });

        cmAuthenticationRequestFactory.on('deregister', function(){
//            console.log('cmHooks - cmAuthenticationRequestFactory:deregister');
            cmUserModel.signOwnKeys();
        });
    }
]);