'use strict';

angular.module('cmUi').factory('cmContextModel', [
    'cmStateManagement', 'cmObject', 'cmLogger',
    'cmConversationModel', 'cmContactModel',
    '$rootScope', '$q',
    function(cmStateManagement, cmObject, cmLogger,
             cmConversationModel, cmContactModel,
             $rootScope, $q) {

        function cmContextModel(data){
            var self = this;

            cmObject.addEventHandlingTo(this);

            this.state = new cmStateManagement();

            this.type = undefined;
            this.model = undefined;

            function init(data){
                //cmLogger.debug('cmContextModel init');
                self.importData(data);
            }

            this.importData = function(data){
                //cmLogger.debug('cmContextModel.importData');

                this.type   = data.type || this.type;
                this.model  = data.model || this.model;
            };

            this.processDelete = function(){
                //cmLogger.debug('cmContextModel.processDelete');

                if(this.type == 'conversation' && this.model instanceof cmConversationModel){
                    console.log('delete conversation', this.model)
                } else if(this.type == 'contact' && this.model instanceof cmContactModel){
                    console.log('delete contact', this.model)
                }
            };


            init(data);
        }

        return cmContextModel;
    }
]);