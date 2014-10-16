'use strict';

angular.module('cmCore')
.factory('cmFileFactory', [
    'cmFileModel',
    '$rootScope',
    function(cmFileModel, $rootScope){
        var instances = [];

        $rootScope.$on('logout', function(){
            instances = [];
        });

        $rootScope.$on('identity:switched', function(){
            instances = [];
        });

        return {
            create: function(data, explicit){
                var file = null,
                    i = 0;

                if(typeof explicit === 'undefined'){
                    explicit = false;
                }

                if(explicit !== true) {
                    // existing via id
                    if (typeof data == 'string') {
                        while (i < instances.length) {
                            if (typeof instances[i] === 'object' &&
                                instances[i].id == data) {
                                file = instances[i];
                                break;
                            }

                            i++;
                        }
                        //
                    } else if (typeof data == 'object') {
                        while (i < instances.length) {
                            if (typeof instances[i] === 'object' &&
                                instances[i].id == data.id) {
                                file = instances[i];
                                break;
                            }

                            i++;
                        }
                    }
                }
                // create model
                if(file == null){
                    file = new cmFileModel(data);
                    instances.push(file);
                }

                return file;
            },
            remove: function(file){
                var bool = false;

                var index = instances.indexOf(file);

                if(index != -1) {
                    instances.splice(index, 1);
                    bool = true;
                }

                return bool;
            },
            getQty: function(){
                return instances.length;
            }
        }
    }
]);