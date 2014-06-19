'use strict';
// TODO: doku and tests
angular.module('cmCore').provider('cmBoot', [
    function(){

        var promise = undefined;

        this.ready = function($q){
            if (promise == undefined) {
                promise = $q.defer();
            }
            return promise.promise;
        };

        this.$get = [
            '$q',
            '$rootScope',
            function($q, $rootScope) {

                $rootScope.$on('logout', function(){
                    promise = undefined
                });

                return {
                    resolve: function(){
                        if(promise == undefined) {
                            promise = $q.defer();
                        }
                        promise.resolve();
                    }
                }
            }
        ]
    }
]);