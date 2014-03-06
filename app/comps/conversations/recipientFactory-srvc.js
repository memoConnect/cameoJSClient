'use strict';

function cmRecipientFactory ($rootScope, cmRecipientModel){
    var instanceMock = [{id:'',instance:{}}];
    var instances = [];

    $rootScope.$on('logout', function(){
        instances = [];
    });

    return {
        create: function(data){
            if(typeof data !== 'undefined'){
                var recipient = null;

                for(var i = 0; i < instances.length; i++){
                    if(typeof instances[i] === 'object' &&
                        instances[i].id == data.identityId){

                        recipient = instances[i].instance;
                        break;
                    }
                }

                if(recipient === null){
                    recipient = new cmRecipientModel(data.identity);
                    instances.push({id:data.identityId,instance:recipient});
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