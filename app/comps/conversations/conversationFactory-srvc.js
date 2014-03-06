'use strict';

function cmConversationFactory (cmConversationModel){
    var instanceMock = [{id:'',instance:{}}];
    var instances = [];

    return {
        create: function(data){
            if(typeof data !== 'undefined'){
                var conversation = null;
                for(var i = 0; i < instances.length; i++){
                    if(typeof instances[i] === 'object' &&
                        instances[i].id == data.id){

                        conversation = instances[i].instance;
                        break;
                    }
                }

                if(conversation === null){
                    var conversation = new cmConversationModel(data);

                    instances.push({id:data.id,instance:conversation});
                }

                return conversation;
            }

            return null;
        },

        getQty: function(){
            return instances.length;
        }
    }
}