'use strict';

angular.module('cmCore').provider('cmBoot', [
    function(){
        this.$get = [
            '$q',
            'cmLogger',
            function($q, cmLogger) {
                var promise = undefined;

//                var cmBoot = function(){
                return {
                    ready : function () {
                        cmLogger.debug('cmBoot:ready');

                        if (promise == undefined) {
                            promise = $q.defer().promise;
                        }

                        return promise;
                    },

                    resolve : function (){
                        cmLogger.debug('cmBoot:resolve');

                        if(promise == undefined) {
                            promise = $q.defer().promise;
                        }

                        promise.resolve();
                    }
                }
            }
        ]
    }
]);