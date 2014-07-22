'use strict';

angular.module('cmCore').service('cmHooks', [
    'cmUserModel',
    'cmObject',
    'cmApi',
    'cmModal',
    'cmLogger',
    '$location',
    '$rootScope',
    function(cmUserModel, cmObject, cmApi, cmModal, cmLogger, $location, $rootScope){
        var self = this;
        cmObject.addEventHandlingTo(this);

        /**
         * Event Handling
         */

        /**
         * authenticationRequest:new
         */
        cmApi.on('authenticationRequest:new', function(event, request){
//        $rootScope.$on('authenticationRequest:new', function(){
            cmLogger.debug('cmHooks.on:authenticationRequest:new');

            var requestMock = {
                signature: "3f6457ecd81aedc854f2931936b0b7eea3432f8dabe08b6f1fda1debe796e79897ff89a71ccb015d80111f58ec37baa15649a52240133a721dd78710538d1c882ef57d7276fd7b4bcbb4568d44c8684ec0d7a2607e66b2a835cf48692f92eddb5838c133962c7efc8033099d480822b3395817e682e9cb066015d2e59d771742539b28be3682ae38dfcd7671d1bf19f6fa21fffb61522d7c549cbc2f5ddf4d56ca6b241287ac4d728993e1afaab95fbd25f588cdebea524299c2dae92df8219678d0685de54dd1d0107349fb5dac63eeb99700330cd479ea98c86c69949c22c02c17df9460032bd7735bcaf4344793ccb41e69d219fbc6e0ae6ab55f21ad5092",
                encryptedTransactionSecret: "ajQ1hzaxg4B7vHhzv9Untw3aN02FYJeHj6UNyFLxt+qbCVQNoZnw/Y2RVf69XmonXtxINE4MJl8EKmB7uqACzF+FJEul1s+A98MWD0VJ27+29wOM7zl4WC3i/Aw3ZDn0uFTzE9I/g/nh22Ku1VHWegLWXUSb2U7DdLwibUOI0lI5vIE1gApNKPZaXCMIUlFW15bkKbJZsB6RQVvVNPpmtlhcD/wZTyKwDaDzYdXM4iHuzDECESKjBVQriUT/6OuqwpdMEwvPYq5UVZhGcKMhpMpWXfunOl4/qGEBmOKOYxVer3O+bJFs0YBeJcsxltmTu6Fva4bPVcx2gfECjKvgZg==",
                fromKeyId: "EACBgAsR4bTL1jyQiTTD",
                toKeyId: "Df67hlI3Ws10DLp9PF61"
            };

            if(cmUserModel.verifyAuthenticationRequest(request) !== false){
                var scope = $rootScope.$new();
                scope.data = request;

                var modalId = 'new-authentication-request';
                cmModal.create({
                    id: modalId,
                    type: 'plain',
                    'class': 'no-padding'
                },'<cm-new-authentication-request></cm-new-authentication-request>',null,scope);
                cmModal.open(modalId);
            }
        });
    }
]);