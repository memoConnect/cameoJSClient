'use strict';

angular.module('cmPhonegap').service('cmDevices', [
    'cmUtil', 'cmLogger', 'cmApi',
    function (cmUtil, cmLogger, cmApi) {
        return {
            checkDeviceId: function(accountPushDevices){
            /*
             GET
             accountPushDevices = [
                 {
                     "deviceId": "id",
                     "language": "en-US",
                     "platform": "android"
                 }
             ]
            */



            },
            pushDevice: function(){
                // login
                // POST /pushDevice
                /*
                 {
                     "deviceId":"id",
                     "language":"en-US",
                     "platform":"android"
                 }
                */
            },
            deleteDevice: function(){
                // logout
                // DELETE /deviceId/{id}
            }
        }
    }
]);