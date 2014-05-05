'use strict';

angular.module('cmFiles').factory('cmAssetModel',[
    'cmObject',
    'cmLogger',
    function(cmObject, cmLogger){
        var Asset = function(id){
             // Attributes
            var self = this;

            // expand object
            cmObject.addEventHandlingTo(this);

            /**
             * Initialize Asset
             * @param id
             */
            this.init = function(id){
                if(!id){
                    return this;
                }

                this.id = id;
            }

            this.init(id);
        };

        return Asset;
    }
]);