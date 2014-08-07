'use strict';


//Todo: This is not in use, ist it?
//This factory provides a generic Model

angular.module('cmCore')
.factory('cmModel',[

    'cmObject',

    function(cmObject) {

        /**
         * generic Model
         */

        var cmModel = function(){
            this.state = {}

            cmObject
            .addEventHandlingTo(this)
            .addChainHandlingTo(this)

            this.setState = function(key, value){
                var old_value = this.state[state_name],
                    new_value = value

                this.state[state_name] = new_value
                this.trigger('state-change:'+key, {'old_value': old_value, 'new_value': new_value} )

                return this
            }

            /**
             * Function to update model with data from backend. This function is meant to be overwritten.
             */

            this.refresh = function(){
                return this
            }
        }

        return cmModel
    }

])