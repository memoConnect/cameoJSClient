'use strict';

angular.module('cmUi').factory('cmContextModel', [
    'cmStateManagement', 'cmObject', 'cmLogger',
    '$rootScope', '$q',
    function(cmStateManagement, cmObject, cmLogger,
             $rootScope, $q) {

        function cmContextModel(data){
            var self = this;

            function init(data){
                //cmLogger.debug('cmContextModel.init')

                console.log('cmContext.init data', data)
            }


            init(data);
        }

        return cmContextModel;
    }
]);