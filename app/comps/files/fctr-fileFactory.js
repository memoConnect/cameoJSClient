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
            create: function(data){
                var asset = null,
                    i = 0;

                if(typeof data == 'string'){
                    while(i < instances.length){
                        if(typeof instances[i] === 'object' &&
                            instances[i].id == data){
                                asset = instances[i];
                                break;
                        }

                        i++;
                    }
                } else if (typeof data == 'object'){
                    while(i < instances.length){
                        if(typeof instances[i] === 'object' &&
                            instances[i].id == data.id){
                            asset = instances[i];
                            break;
                        }

                        i++;
                    }
                }

                if(asset == null){
                    asset = new cmFileModel(data);
                    instances.push(asset);
                }

                return asset;
            },
            getQty: function(){
                return instances.length;
            }
        }
    }
]);