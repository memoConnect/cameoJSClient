'use strict';

angular.module('cmFiles').factory('cmAssetFactory', [
    'cmAssetModel',
    '$rootScope',
    function(cmAssetModel, $rootScope){
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

                    if(asset == null){
                        asset = new cmAssetModel(id);
                        instances.push(asset);
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

                return asset;
            },
            getQty: function(){
                return instances.length;
            }
        }
    }
]);