'use strict';

function cmConversationFactory ($rootScope, cmConversationModel){
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

                        conversation = instances[i];
                        break;
                    }
                    i++;
                }

                if(conversation === null){
                    conversation = new cmConversationModel(data);                                        
                    instances.push(conversation);
                }

            } else {
                conversation = new cmConversationModel();
                instances.push(conversation);
            }

            return conversation;
        },
        getQty: function(){
            return instances.length;
        }
    }
}