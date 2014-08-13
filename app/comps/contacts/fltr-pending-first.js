angular.module('cmContacts').filter('cmPendingFirst', [

    //no dependencies
    
    function(){
        return  function(arrayOfContacts){
                    return arrayOfContacts.sort(function(contact1, contact2){
                        return (contact2.contactType == 'pending' && contact1.contactType != 'pending')
                    })
                }
    }
])