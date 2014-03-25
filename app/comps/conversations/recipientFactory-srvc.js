'use strict';

function cmRecipientFactory ($rootScope, cmRecipientModel, cmUtil){
    var instances = [];

    $rootScope.$on('logout', function(){
        instances = [];
    });

    return {
        create: function(data){
            var recipient = null,
                i = 0;
            if(typeof data !== 'undefined'){
                if(this.getQty() > 0){
                    if(typeof data === 'string'){
                        while(i < instances.length){
                            if(typeof instances[i] === 'object' && instances[i].identity.id == data){
                                recipient = instances[i];
                                break;
                            }
                            i++;
                        }
                    } else if(typeof data === 'object'){
                        while(i < instances.length){
                            if(typeof instances[i] === 'object' && instances[i].identity.id == data.identity.id){
                                recipient = instances[i];
                                break;
                            }
                            i++;
                        }
                    }
                }

                if(recipient === null){
                    recipient = new cmRecipientModel(data);
                    instances.push(recipient);
                }
            }

            return recipient;
        },

        getQty: function(){
            return instances.length;
        }
    }
}