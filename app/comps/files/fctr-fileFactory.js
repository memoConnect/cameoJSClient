'use strict';

angular.module('cmFiles').factory('cmFileFactory', [
    'cmFileModel',
    '$rootScope',
    function(cmFileModel, $rootScope){
        var instances = [];

        $rootScope.$on('logout', function(){
            instances = [];
        });

        return {
            create: function(data, explicit){
                var file = null,
                    i = 0;
1
                if(typeof explicit === 'undefined'){
                    explicit = false;
                }

                if(explicit !== true) {
                    if (typeof data == 'string') {
                        while (i < instances.length) {
                            if (typeof instances[i] === 'object' &&
                                instances[i].id == data) {
                                file = instances[i];
                                break;
                            }

                            i++;
                        }
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

                if(file == null){
                    file = new cmFileModel(data);
                    instances.push(file);
                }

                return file;
            },
            getQty: function(){
                return instances.length;
            }
        }
    }
]);