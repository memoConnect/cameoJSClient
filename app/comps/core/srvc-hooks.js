'use strict';

angular.module('cmCore').service('cmHooks', [
    'cmObject',
    'cmApi',
    'cmModal',
    'cmLogger',
    '$location',
    '$rootScope',
    function(cmObject, cmApi, cmModal, cmLogger, $location, $rootScope){
        var self = this;
        cmObject.addEventHandlingTo(this);

        /**
         * Event Handling
         */
        $rootScope.$on('authenticationRequest:new', function(){
            cmLogger.debug('cmHooks.on:authenticationRequest:new')
        });
    }
]);