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
            '$document',
            function($q, $rootScope, $document) {

                $rootScope.$on('logout', function(){
                    promise = undefined;
                });

                $rootScope.$on('identity:switched', function(){
                    promise = undefined;
                });

                $rootScope.$on('appSpinner', function(event, action){
                    // hide app spinner
                    angular.element($document[0].querySelector('.app-spinner')).css('display',action == 'hide'?'none':null);
                });

                return {
                    resolve: function(){
                        if(promise == undefined) {
                            promise = $q.defer();
                        }

                        $rootScope.$broadcast('appSpinner','hide');

                        promise.resolve();
                    }
                }
            }
        ]
    }
]);