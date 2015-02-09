'use strict';

angular.module('cmContacts').factory('cmPendingContactContextModel', [
    'cmStateManagement', 'cmObject', 'cmLogger',
    'cmContactsModel',
    '$rootScope', '$q',
    function(cmStateManagement, cmObject, cmLogger,
             cmContactsModel,
             $rootScope, $q) {

        function cmPendingContactContextModel(data){
            var self = this;

            cmObject.addEventHandlingTo(this);

            this.state = new cmStateManagement();

            this.id = undefined;
            this.model = undefined;

            this.contact = undefined;

            function init(model){
                //cmLogger.debug('cmPendingContactContextModel init');

                // check instance of model, if wrong trigger deregister
                self.importData(model);
            }

            this.importData = function(model){
                //cmLogger.debug('cmPendingContactContextModel.importData');

                this.model = model || this.model;
                this.id = this.model.id;

                this.contact = cmContactsModel.findByIdentityId(this.id);
            };

            this.delete = function(){
                //cmLogger.debug('cmPendingContactContextModel.delete');

                return cmContactsModel.deleteFriendRequest(this.contact)
            };

            init(data);
        }

        return cmPendingContactContextModel;
    }
]);