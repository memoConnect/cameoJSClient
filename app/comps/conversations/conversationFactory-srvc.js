'use strict';

function cmConversationFactory ($rootScope, cmConversationModel){
    var instanceMock = [{id:'',instance:{}}];
    var instances = [];

    $rootScope.$on('logout', function(){
        instances = [];
    });

    return {
        create: function(data){            
            var i = 0,
                conversation = null;

            if(typeof data !== 'undefined'){
                while(i < instances.length){
                    if(typeof instances[i] === 'object' &&
                        instances[i].id == data.id){

                        conversation = instances[i].instance;
                        break;
                    }
                    i++;
                }

                if(conversation === null){
                    conversation = new cmConversationModel(data);                    
                    instances.push({id:data.id,instance:conversation});
                }

                return conversation;
            }

            return new cmConversationModel();
        },
        save: function(conversation){
            var check = false;
            if(conversation instanceof 'cmConversationModel' && conversation.id == ''){
               // Start Save Procedure
               // instances.push({id:conversation.id,instance:conversation});
            }
            return conversation;
        },
        getQty: function(){
            return instances.length;
        }
    }
}