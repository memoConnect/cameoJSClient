'use strict';

function cmConversationFactory ($rootScope, cmConversationModel){
    var instanceMock = [{id:'',instance:{}}];
    var instances = [];

    $rootScope.$on('logout', function(){
        instances = [];
    });

    return {
        create: function(data){            
            var i = 0;
            if(typeof data !== 'undefined'){
                var conversation = null;

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

            return null;
        },

        getQty: function(){
            return instances.length;
        }
    }
}