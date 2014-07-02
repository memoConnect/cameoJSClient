'use strict';

//This factory provides a generic Factory

angular.module('cmCore').factory('cmFactory',[
    'cmObject',
    function(cmObject) {

        /**
         * generic Factory, has to be setup with a model to create instances from. A model is expected to have .refresh() method, to get data from the backend.
         * @param {function}    model           Constructor function. If instances.id exists dublicates will be prevented. 
         * @param {string}      [uniqueKey]     Key in raw data to check for dublicates with. (i.e. "instances.id")    
         */

        return function cmFactory(model, uniqueKey){

            var self        = new Array();

            self.model      = model;

            cmObject.addEventHandlingTo(self);

            uniqueKey = uniqueKey || 'id'

            function evalPath(object, path){
                return path.split('.').reduce(function(result,key){ return typeof result == 'object' ? result[key] : null }, object || {})
            }

            /**
             * Function to create an instance of this.model. If an instance with the same id as provided already exist, fetch it instead off creating a new one.
             * @param   {string|object}   args        instance id, data set including an instance id or data set without an id
             * @returns {model}                      allways returns an instance of model. If an id is present in args and an instance with that id already exists, 
             *                                      this instance will be returned – otherwise a new one will be created and if possible populated with data from the backend.
             */
            self.create = function(args, withNewImport){
                var id          =   evalPath(args, uniqueKey) || args;

                var instance = self.find(id);

                if(instance === null){
                    instance = self.new(args);
                } else if(typeof withNewImport === 'boolean' && withNewImport == true && typeof instance.importData == 'function'){
                    instance.importData(args);
                }

                return instance;
            };

            /**
             * Function to find and instance by its id.
             * @param   {string}         id          The id of the instance to find.
             * @returns {model|null}                 returns the first instance to match the id or null if none is found 
             */
            self.find = function(id){
                if(!id)
                    return null;

                var matches = self.filter(function(instance){ return instance.id == id })

                return matches.length ? matches[0] : null       
            };


            /**
             * Function to create a new model instance. 
             * @param   {string|object}   args        instance id, data set including an instance id or data set without an id
             * @return  {cmModel}                    returns a new model instance populated with the provided data
             */
            self.new = function(args, withoutRegister){
                var data     = typeof args == 'string' ? {id:args} : args,
                    instance = new self.model(data);

                // TODO: before init:ready in instance factory.echoEventsFrom(self); for observing before triggering

                if(typeof withoutRegister !== 'boolean' || withoutRegister == false){
                    self.register(instance)
                }

                return instance
            };

            /**
             * Function to store a model instance for later use, retrievable by its id
             * @param {model}           instance    an instance of model
             */
            self.register = function(instance){
                if(
                    self.indexOf(instance) == -1
                    && instance instanceof this.model
                ){
                    self.push(instance);

                    self.echoEventsFrom(instance);

                    self.trigger('register', instance);

                    return self.length
                }

                return false
            };

            /**
             * Function to remove a model instance
             * @param {model}           instance    an instance of model
             */
            self.deregister = function(instance){
                if(
                    self.indexOf(instance) != -1
                    && instance instanceof this.model
                ){
                    var i = self.length;
                    while(i){
                        i--;
                        if(self[i] == instance){
                            self.splice(i, 1);

                            self.trigger('unregistered');

                            break;
                        }
                    }
                }
            };

            /**
             * Function to remove all instances from the factory.
             * @returns @this    for chaining
             */
            self.reset = function(){
                while(self.length > 0) self.pop()
                return self
            };


            /**
             * Event Handling
             */
            self.on('register', function(event, instance){
                if(typeof instance.trigger == 'function'){
                    instance.trigger('init:ready'); // Todo: ieses event sollte die instance eher selber triggern oder?
                }
            });

            return self
        }
    }
])