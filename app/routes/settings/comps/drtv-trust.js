'use strict';

angular.module('cmRouteSettings')
.directive('cmTrust', [
    'cmUserModel', 'cmUtil', 'cmCrypt',
    function(cmUserModel, cmUtil, cmCrypt){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-trust.html',
            controller: function ($scope) {
                $scope.cmUtil = cmUtil;

                var ownKeys = cmUserModel.data.identity.keys,
                    identityId = cmUserModel.data.identity.id,
                    device2 = ownKeys[0],
                    device1 = ownKeys[1];

                    $scope.isSignatureValid = false;

                //////////////////////////////
                // transactionSecret
                $scope.transactionSecret = cmCrypt.generatePassword(6);
                var encryptedTransactionSecret = device1.encrypt($scope.transactionSecret);

                //////////////////////////////
                // device #2
                // sign his pubkey with signature
                var signature = cmCrypt.signPubKey(
                    device2.getPrivateKey(), // privkey #2
                    identityId, // identityId to verify
                    encryptedTransactionSecret // pubkey #1  //device1.getPublicKey()
                );

                //////////////////////////////
                // BE save signature to pubkey #1
                // BE event new:key
                // (POST /identity/authenticationRequest)
                var request = {
                    signature: signature,
                    encryptedTransactionSecret: encryptedTransactionSecret,
                    fromKeyId: device2.id,
                    toKeyId: device1.id
                };
                console.log(request)

                //////////////////////////////
                // device #1
                // get signature to new pub key
                if(request.toKeyId == device1.id) {
                    // check signature
                    if (cmCrypt.verifyPubKey(
                        device2.getPublicKey(), // pubkey #2 request.fromKeyId
                        identityId, // identityId for verify
                        request.encryptedTransactionSecret, // pubkey #1 //device1.getPublicKey()
                        signature
                    )) {
                        $scope.isSignatureValid = true;
                    }

                    // check encryptedTransactionSecret
                    console.log(device1.decrypt(request.encryptedTransactionSecret));

                }


                /////////////////////////////
                // BE save signature

                $scope.schmu = {
                    ownKeys: ownKeys,
                    signature: signature
                };
            }
        }
    }
]);