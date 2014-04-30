'use strict';

angular.module('cmFiles').service('cmAssetFactory', [
    '$rootScope',
    function($rootScope){
        var instances = [];

        $rootScope.$on('logout', function(){
            instances = [];
        });

        return {
            create: function(id){
                /**
                 * do something
                 */
            },
            getQty: function(){
                return instances.length;
            }
        }
    }
]);