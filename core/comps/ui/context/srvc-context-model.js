'use strict';

angular.module('cmUi').factory('cmContextModel', [
    'cmStateManagement', 'cmObject', 'cmLogger',
    '$rootScope', '$q',
    function(cmStateManagement, cmObject, cmLogger,
             $rootScope, $q) {

        function cmContextModel(data){
            var self = this;

            cmObject.addEventHandlingTo(this);

            this.state = new cmStateManagement();

            this.type = undefined;
            this.model = undefined;

            function init(data){
                cmLogger.debug('cmContextModel init()');

                // validate data

                self.importData(data);
            }

            this.importData = function(data){
                cmLogger.debug('cmContextModel.importData');
                console.log(data);

                this.type   = data.type || this.type;
                this.model  = data.model || this.model;
            };

            init(data);
        }

        return cmContextModel;
    }
]);