'use strict';

//This factory provides a generic Factory

angular.module('cmCore').factory('cmFactory',[
    'cmObject',
    'cmLogger',
    function(cmObject, cmLogger) {

        /**
         * generic Factory, has to be setup with a model to create instances from. A model is expected to have .refresh() method, to get data from the backend.
         * @param {function}    model           Constructor function. If instances.id exists dublicates will be prevented. 
         * @param {string}      [uniqueKey]     Key in raw data to check for dublicates with. (i.e. "instances.id")    
         */

        return function cmFactory(model, sameByData, sameByInstance){

            var self        = new Array();

            self.model      = model;

            cmObject.addEventHandlingTo(self);

            sameByData = sameByData || function(instance, data){
                return instance.id && data.id && instance.id == data.id
            };

            sameByInstance = sameByInstance || function(instance_1, instance_2){
                return instance_1.id && instance_1.id == instance_2.id
            };

            /**
             * Function to create an instance of this.model. If an instance with the same id as provided already exist, fetch it instead off creating a new one.
             * @param   {string|object}   args        instance id, data set including an instance id or data set without an id
             * @returns {model}                      allways returns an instance of model. If an id is present in args and an instance with that id already exists, 
             *                                      this instance will be returned – otherwise a new one will be created and if possible populated with data from the backend.
             */
            self.create = function(data, withNewImport){

                if(typeof data == 'string') 
                    data = {id: data}

                var instance = self.find(data);

                if(instance === null){
                    instance = self.new(data)
                    self.register(instance)

                } else if(typeof withNewImport === 'boolean' && withNewImport == true && typeof instance.importData == 'function'){
                    instance.importData(data);
                }


                return instance;

            };

            self.importFromDataArray = function(data_arr){
                data_arr.forEach(function(data){
                    self.create(data)
                })
                return self
            }

            self.exportDataArray = function(){
                return  self.map(function(instance){
                            return instance.exportData()
                        })
            }

            /**
             * Function to find and instance by its id.
             * @param   {string}         id          The id of the instance to find.
             * @returns {model|null}                 returns the first instance to match the id or null if none is found 
             */
            self.find = function(args){
                if(!args)
                    return null;

                if(typeof args == 'string')
                    args = {id: args}

                var matches = [];

                if(args instanceof this.model){
                    matches = self.filter(function(instance){ return sameByInstance(instance, args) })
                }else{
                    matches = self.filter(function(instance){ return sameByData(instance, args) })
                }

                return matches.length ? matches[0] : null       
            };

            /**
             * Function to create a new model instance. 
             * @param   {string|object}   args        instance id, data set including an instance id or data set without an id
             * @return  {cmModel}                    returns a new model instance populated with the provided data
             */
            self.new = function(args){
                var data     = typeof args == 'string' ? {id:args} : args,
                    instance = new self.model(data);

                // TODO: before init:ready in instance factory.echoEventsFrom(self); for observing before triggering
                //  - removed register and added it above in create()

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

                    instance.deregister = function(){
                        self.deregister(instance)
                    };

                    self.trigger('register', instance);

                    return self.length
                }

                return false
            };

            /**
             * Function to remove a model instance
             * @param {model}           instance    an instance of model
             */
            self.deregister = function(args){
                var instance    = self.find(args),
                    index       = self.indexOf(instance)

                if(
                    index != -1
                    && instance instanceof this.model
                ){
                    self.splice(index, 1);
                    self.trigger('deregister');
                    return true
                }
                return false
            };

            /**
             * Function to remove all instances from the factory.
             * @returns @this    for chaining
             */
            self.reset = function(callFrom){
                //cmLogger.debug('cmFactory.reset -' + (callFrom ? ' Factory: ' + callFrom : '') + ' Elements: ' + self.length);
                while(self.length > 0){
                    self.pop()
                }

                return self;
            };


            /**
             * Event Handling
             */
            self.on('register', function(event, instance){
                if(typeof instance.trigger == 'function'){
                    instance.trigger('init:ready'); // Todo: dieses event sollte die instance eher selber triggern oder?
                }
            });

            return self
        }
    }
]);