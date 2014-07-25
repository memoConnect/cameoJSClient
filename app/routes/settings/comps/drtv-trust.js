'use strict';

angular.module('cmRouteSettings')
.directive('cmTrust', [
    'cmUserModel', 'cmUtil', 'cmCrypt', 'cmKey', 'cmLogger','$rootScope',
    function(cmUserModel, cmUtil, cmCrypt, cmKey, cmLogger, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-trust.html',
            controller: function ($scope) {
                $scope.cmUtil = cmUtil;

                var ownKeys = cmUserModel.data.identity.keys,
                    ownIdentityId = cmUserModel.data.identity.id,
                    device2 = ownKeys[0],
                    device1 = ownKeys[1];

                console.log('ownKeys',ownKeys)

                /////////////////////////////
                // check vars
                $scope.showModalHandshake = false;
                $scope.handshakeSucceed = false;

                //////////////////////////////
                // transactionSecret
                $scope.transactionSecret = cmCrypt.generateTransactionSecret();
                $scope.transactionSecretUserInput = '';

                //////////////////////////////
                // device #2
                // sign his pubkey with signature
                var dataForRequest = cmCrypt.sign({
                    identityId: ownIdentityId, // identityId for signature
                    transactionSecret: $scope.transactionSecret,
                    fromKey: device2, // cmKey with privkey #2
                    toKey: device1 // cmKey with pubkey #1
                });

                if(dataForRequest != null) {
                    //////////////////////////////
                    // BE save signature to pubkey #1
                    // BE event new:key
                    // (POST /identity/authenticationRequest)
                    var request = {
                        signature: dataForRequest.signature,
                        encryptedTransactionSecret: dataForRequest.encryptedTransactionSecret,
                        fromKeyId: dataForRequest.fromKeyId,
                        toKeyId: dataForRequest.toKeyId
                    };
                } else {
                    cmLogger.warn('no keys exists');
                }

                console.log(request)
                //////////////////////////////
                // device #1
                // get signature to new pub key
                if (request.toKeyId == device1.id) {
                    // check signature
                    if (cmCrypt.verify({
                        identityId: ownIdentityId, // identityId to verify signature
                        fromKey: device2, // pubkey #2 request.fromKeyId
                        encryptedTransactionSecret: request.encryptedTransactionSecret, // ecrypted pubkey with transactionSecret #1
                        signature: request.signature
                    })) {
                        $scope.showModalHandshake = true;
                    } else {
                        $scope.showModalHandshake = false;
                    }
                }

                $scope.checkHandshake = function() {
                    // check encryptedTransactionSecret
                    if ($scope.showModalHandshake && cmCrypt.isTransactionSecretValid({
                            userInput: $scope.transactionSecretUserInput,
                            toKey: device1, // pubkey #1 request.toKeyId
                            encryptedTransactionSecret: request.encryptedTransactionSecret
                        })) {
                        $scope.handshakeSucceed = true;
                        ///////////////////////////////////
                        // BE
                        // save signature to newPubKey
                        // POST /identity...
                    } else {
                        $scope.handshakeSucceed = false;
                    }
                }

                $scope.mockIncomingEvent = function(){
                    $rootScope.$broadcast('authenticationRequest:new');
                }
            }
        }
    }
]);