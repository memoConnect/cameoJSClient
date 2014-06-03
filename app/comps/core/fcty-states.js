'use strict';

//This factory provides state management

angular.module('cmCore')
.factory('cmStateManagement',[

    'cmObject',

    function(cmObject) {

        /**
         * generic state management
         * @param {Array} [states] An array with allowed states
         */

        function cmStateManagement(model){

            var self        = new Array()

            cmObject
            .addEventHandlingTo(self)

            self.set = function(state){
                if(self.indexOf(state) == -1){
                    self.push(state)
                    self.trigger('change')
                }
            }

            self.unset = function(state){
                if(self.indexOf(state) != -1){
                    self.splice(self.indexOf(state),1)
                    self.trigger('change')
                }
            }

            self.get = function(state){
                return self.indexOf(state) != -1
            }

            return self
        }

        return cmStateManagement
    }
])