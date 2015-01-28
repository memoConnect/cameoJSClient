'use strict';

angular.module('cmConversations').factory('cmConversationContextModel', [
    'cmStateManagement', 'cmObject', 'cmLogger',
    'cmConversationFactory', 'cmConversationModel',
    '$rootScope', '$q',
    function(cmStateManagement, cmObject, cmLogger,
             cmConversationFactory, cmConversationModel,
             $rootScope, $q) {

        function cmConversationContextModel(data){
            var self = this;

            cmObject.addEventHandlingTo(this);

            this.state = new cmStateManagement();

            this.model = undefined;

            function init(data){
                //cmLogger.debug('cmConversationContextModel init');
                self.importData(data);
            }

            this.importData = function(data){
                cmLogger.debug('cmConversationContextModel.importData');

                this.model  = data.model || this.model;
            };

            this.delete = function(){
                cmLogger.debug('cmConversationContextModel.processDelete');

                //this.model.delete();
            };


            init(data);
        }

        return cmConversationContextModel;
    }
]);