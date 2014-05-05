'use strict';

angular.module('cmFiles').factory('cmAssetModel',[
    'cmObject',
    'cmFile',
    'cmLogger',
    function(cmObject, cmFile, cmLogger){
        var Asset = function(data){
             // Attributes
            var self = this;

            // expand object
            cmObject.addEventHandlingTo(this);

            /**
             * Initialize Asset
             * @param id
             */
            this.init = function(data){
                if(!data){
                    return this;
                }

                if(typeof data == 'string'){
                    this.id = id;
                } else if(typeof data == 'object'){
                    // todo
                }

            }

            this.init(id);
        };

        return Asset;
    }
]);