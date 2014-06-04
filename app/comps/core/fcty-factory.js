'use strict';

//This factory provides a generic Factory

angular.module('cmCore')
.factory('cmFactory',[

    'cmObject',

    function(cmObject) {

        /**
         * generic Factory, has to be setup with a model to create instances from. A model is expected to have .refresh() method, to get data from the backend.
         * @param {object} [config] 
         */

        return function cmFactory(model){

            var self        = new Array()

            self.model      = model

            cmObject.addEventHandlingTo(self)

            /**
             * Function to create an instance of this.model. If an instance with the same id as provided already exist, fetch it instead off creating a new one.
             * @param   {string|object}   args        instance id, data set including an instance id or data set without an id
             * @returns {model}                      allways returns an instance of model. If an id is present in args and an instance with that id already exists, 
             *                                      this instance will be returned – otherwise a new one will be created and if possible populated with data from the backend.
             */
            self.create = function(args){
                var id          =   typeof args == 'object' 
                                    ?   args.id
                                    :   args

                return self.find(id) || self.new(args) //Todo: self.find(id).importData(args)?
            }

            /**
             * Function to find and instance by its id.
             * @param   {string}         id          The id of the instance to find.
             * @returns {model|null}                 returns the first instance to match the id or null if none is found 
             */
            self.find = function(id){
                if(!id) return null

                var matches = self.filter(function(instance){ return instance.id == id })

                return matches.length ? matches[0] : null       
            }


            /**
             * Function to create a new model instance. 
             * @param   {string|object}   args        instance id, data set including an instance id or data set without an id
             * @return  {cmModel}                    returns a new model instance populated with the provided data
             */

            self.new = function(args){
                var data     = typeof args == 'string' ? {id:args} : args,
                    instance = new self.model(data)

                self.register( instance )
                
                return instance
            }

            /**
             * Function to store a model instance for later use, retrievable by its id
             * @param {model}           instance    an instance pof model
             */

            self.register = function(instance){
                if(
                       self.indexOf(instance) == -1
                    && instance instanceof this.model
                ){
                    self.push(instance)
                    self.trigger('register', instance)

                    return self.length
                }

                return false
            }

            /**
             * Function to remove all instances from the factory.
             * @returns @this    for chaining
             */
            self.reset = function(){
                while(self.length > 0) self.pop()
                return self
            }

            return self
        }
    }
])