'use strict';

function cmMessageFactory ($rootScope, cmMessageModel){
    var instanceMock = [{id:'',instance:{}}];
    var instances = [];

    $rootScope.$on('logout', function(){
        instances = [];
    });

    return {
        create: function(data){
            if(typeof data !== 'undefined'){
                var message = null;
                
                if(data.id){
                    for(var i = 0; i < instances.length; i++){
                        if(typeof instances[i] === 'object' &&
                            instances[i].id == data.id){

                            message = instances[i].instance;
                            break;
                        }
                    }
                }
                
                if(message === null){
                    message = new cmMessageModel(data);
                    instances.push({id:data.id,instance:message});
                }

                return message;
            }

            return null;
        },

        getQty: function(){
            return instances.length;
        }
    }
}