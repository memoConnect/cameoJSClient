'use strict';

function cmRecipientFactory (cmRecipientModel){
    var instanceMock = [{id:'',instance:{}}];
    var instances = [];

    return {
        create: function(data){
            if(typeof data !== 'undefined'){
                var recipient = null;
                for(var i = 0; i < instances.length; i++){
                    if(typeof instances[i] === 'object' &&
                        instances[i].id == data.id){

                        recipient = instances[i].instance;
                        break;
                    }
                }

                if(recipient === null){
                    var recipient = new cmRecipientModel(data);

                    instances.push({id:data.id,instance:recipient});
                }

                return recipient;
            }

            return null;
        },

        getQty: function(){
            return instances.length;
        }
    }
}