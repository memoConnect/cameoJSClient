'use strict';

angular.module('cmContacts').factory('cmContactContextModel', [
    'cmStateManagement', 'cmObject', 'cmLogger',
    'cmContactModel',
    '$rootScope', '$q',
    function(cmStateManagement, cmObject, cmLogger,
             cmContactModel,
             $rootScope, $q) {

        function cmContactContextModel(data){
            var self = this;

            cmObject.addEventHandlingTo(this);

            this.state = new cmStateManagement();

            this.id = undefined;
            this.model = undefined;

            function init(model){
                //cmLogger.debug('cmContactContextModel init');

                // check instance of model, if wrong trigger deregister
                self.importData(model);
            }

            this.importData = function(model){
                //cmLogger.debug('cmContactContextModel.importData');

                this.model = model || this.model;
                this.id = this.model.id;
            };

            this.delete = function(){
                //cmLogger.debug('cmContactContextModel.delete');

                return this.model.delete(true);
            };

            init(data);
        }

        return cmContactContextModel;
    }
]);