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
            create: function(id){
                var asset = null,
                    i = 0;

                if(typeof id == 'string'){
                    while(i < instances.length){
                        if(typeof instances[i] === 'object' &&
                            instances[i].id == id){
                                asset = instances[i];
                                break;
                        }

                        i++;
                    }

                    if(asset == null){
                        asset = new cmAssetModel(id);
                        instances.push(asset);
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