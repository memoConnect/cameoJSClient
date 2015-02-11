'use strict';

/**
 * @ngdoc object
 * @name cmLocalStorage
 * @description
 *
 * @requires cmLocalStorageService
 * @requires $rootScope
 */
angular.module('cmCore')
    .factory('cmLocalStorage',[
        'cmLocalStorageService','cmLogger',
        '$rootScope',
        function(cmLocalStorageService, cmLogger,
                 $rootScope){
            var instanceMock = [{id:'',instance:{}}];
            var instances = [];

            function resetInstances(){
                cmLogger.debug('cmLocalStorage resetInstances');
                var i = 0;
                while(i < instances.length){
                    instances[i].instance.reset();
                    instances[i] = null;

                    i++;
                }

                instances = null;
                instances = [];
            }

            $rootScope.$on('logout', resetInstances);

            $rootScope.$on('identity:switched', resetInstances);

            return {
                /**
                 * returns instances of cmLocalStorageService
                 * @param id
                 * @returns {*}
                 */
                create: function(id, key){
                    if(typeof id !== 'undefined' && id != '' && typeof key !== 'undefined' && key != ''){
                        var storage = null;

                        for(var i = 0; i < instances.length; i++){
                            if(typeof instances[i] === 'object' &&
                                instances[i].id == id){

                                storage = instances[i].instance;
                                break;
                            }
                        }

                        if(storage === null){
                            storage = new cmLocalStorageService();
                            storage.init({id:id,key:key});

                            instances.push({id:id,instance:storage});
                        }

                        return storage;
                    }

                    return null;
                },
                getQty: function(){
                    return instances.length;
                }
            }
        }
    ]);