'use strict';
// TODO: doku and tests
angular.module('cmCore')
.provider('cmBoot', [
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
            '$window',
            function($q, $rootScope, $window) {

                $rootScope.$on('logout', function(){
                    promise = undefined;
                });

                $rootScope.$on('identity:switched', function(){
                    promise = undefined;
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