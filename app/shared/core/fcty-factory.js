'use strict';

//This factory provides a generic Factory

angular.module('cmCore')
.factory('cmFactory',[

    //no dependencies

    function() {

        /**
         * generic Factory, has to be setup with a model to create instances from. A model is expected to have .refresh() method, to get data from the backend.
         * @param {object} [config] 
         */


        var cmFactory = function(data){

            this.model      = undefined     //expects model to have .refresh() function
            this.instances  = []

            /**
             * Function to initialiaze the factory.
             * @param {object} config all the configuration data, needed for .setup()
             */
            this._init = function(config){
                this.setup(config)
                return this
            }

            /**
             * Function to setup the factory, may be used again after initialization to change the configuration.
             * @param  {object} configuration data
             */
            this.setup = function(config){
                if(config.model instanceof cmModel) cmLogger.error('cmFactory: wrong model type.')
                this.model = config.model
                return this
            }

            /**
             * Function to get an instance of this.model.
             * @param {string|object} args instance id, data set including an instance id or data set without an id
             * @return {model} allways returns an instance of model. If an id is present in args and an instance with that id already exists, 
             * this instance will be returned – otherwise a new one will be created and if possible populated with data from the backend.
             */
            this.get = function(args){
                var id          =   typeof args == 'string' 
                                    ?   args
                                    :   args.id

                return this.find(id) || this.new(args).refresh()
            }

            /**
             * Function to find and instance by its id.
             * @param  {string} id The id of the instance to find.
             * @return {model|null} returns the first instance to match the id or null if none is found 
             */
            this.find = function(id){
                if(!id) return null

                var matches = instances.filter(function(instances){ return instance.id == id })

                return matches.length ? matches[0] : null       
            }


            /**
             * Function to create a new model instance
             * @param {String|Object} args instance id, data set including an instance id or data set without an id
             * @return {cmModel} returns a new model instance populated with the provided data
             */

            this.new = function(args){
                var data     = typeof args == 'string' ? {id:args} : args,
                    instance = new this.model()

                this.register( instance.importData(data) )
                
                return instance
            }

            /**
             * Function to store a model instance for later use, retrievable by its id
             * @param {model} instance an instance pof model
             */

            this.register = function(instance){
                if(this.instances.indexOf(instance) != -1) this.instances.push(instance)
                return this
            }

            this._init(data)
        }

        return factory
    }
])