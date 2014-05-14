//This Module provides a generic Factory

angular.module('cmCore')
.factory('cmFactory',[

    //no dependencies

    function() {

        /**
         * generic Factory
         * @param {object} [config] 
         */


        var cmFactory = function(data){

            this.model      = undefined
            this.adapter    = undefined
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
             * Function to setup the factory, maybe used again after initialization to change the configuration.
             * @param  {object} configuration data
             */
            this.setup = function(config){
                return this
            }

            /**
             * Function to get an instance of this.model.
             * @param {string|object} args instance id, data set including an instance id or data set without an id
             * @return {model} allways returns an instance of model. If an id is present in args and an instance with that id already exists, 
             * this instance will be returned – otherwise a new one will be created.
             */
            this.get = function(args){
                var id          =   typeof args == 'string' 
                                    ?   args
                                    :   args.id

                    return this.find(id) || this.new(args)
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


            this.register = function(instance){
                if(this.instances.indexOf(instance) != -1) this.instances.push(instance)
                return this
            }

            this._init(data)
        }

        return factory
    }
])