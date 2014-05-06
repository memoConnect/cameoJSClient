'use strict';

angular.module('cmFiles').factory('cmAssetModel',[
    'cmObject',
    'cmFile',
    'cmLogger',
    function(cmObject, cmFile, cmLogger){
        var Asset = function(data){
             // Attributes
            var self = this;

            this.id = 'undefined';
            this.file = null;

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
                    /**
                     * DO API Call
                     */
                } else if(typeof data == 'object'){
                    // todo
                    this.id = data.id;
                    this.file = data;
                }

            }

            this.init(data);
        };

        return Asset;
    }
]);