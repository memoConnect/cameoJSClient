'use strict';

angular.module('cmConversations').factory('cmMessageFactory',[
    '$rootScope',
    'cmMessageModel',
    function ($rootScope, cmMessageModel){
        var instances = [];

        $rootScope.$on('logout', function(){
            instances = [];
        });

        return {
            get: function(data){

                if(!data){
                    cmLogger.error('cmMessageFactory: unable to get Message. data: '+data)
                    return null
                }

                var message = null,
                    id      = data.id || data

                message = this.getById(id) 

                if(message === null){
                    message = new cmMessageModel(data);
                    instances.push(message);
                }

                return message;
            },

            create: function(data){
                return this.get(data || {})
            },

            //get Message by id
            getById: function(id){
                var message = null;

                for(var i = 0; i < instances.length; i++){
                    if(
                        typeof instances[i] === 'object' &&
                        instances[i].id == id
                    ){
                        message = instances[i];
                        break;
                    }
                }

                return message
            },

            getQty: function(){
                return instances.length;
            }
        }
    }
])