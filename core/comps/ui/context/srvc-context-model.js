'use strict';

angular.module('cmUi').factory('cmContextModel', [
    'cmStateManagement', 'cmObject', 'cmLogger',
    'cmConversationContextModel', 'cmContactContextModel',
    '$rootScope', '$q',
    function(cmStateManagement, cmObject, cmLogger,
             cmConversationContextModel, cmContactContextModel,
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

                switch(this.type){
                    case "conversation":
                            this.model = new cmConversationContextModel(data.model) || this.model;
                        break;
                    case "contact":
                            this.model = new cmContactContextModel(data.model) || this.model;
                        break;
                    default:
                        // remove model from factory
                }
            };

            this.delete = function(){
                //cmLogger.debug('cmContextModel.delete');

                return this.model.delete();
            };


            init(data);
        }

        return cmContextModel;
    }
]);