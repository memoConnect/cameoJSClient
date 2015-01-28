'use strict';

angular.module('cmContacts').factory('cmContactContextModel', [
    'cmStateManagement', 'cmObject', 'cmLogger',
    'cmContactsModel', 'cmContactModel',
    '$rootScope', '$q',
    function(cmStateManagement, cmObject, cmLogger,
             cmContactsModel, cmContactModel,
             $rootScope, $q) {

        function cmContactContextModel(data){
            var self = this;

            cmObject.addEventHandlingTo(this);

            this.state = new cmStateManagement();

            this.model = undefined;

            function init(model){
                //cmLogger.debug('cmContactContextModel init');
                self.importData(model);
            }

            this.importData = function(model){
                //cmLogger.debug('cmContactContextModel.importData');

                this.model  = model || this.model;
            };

            this.delete = function(){
                cmLogger.debug('cmContactContextModel.delete');

                this.model.delete(true);
            };


            init(data);
        }

        return cmContactContextModel;
    }
]);