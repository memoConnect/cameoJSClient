angular.module('cmContacts').filter('cmPendingFirst', [

    //no dependencies
    
    function(){
        return  function(arrayOfContacts){
                    var copy = arrayOfContacts.slice(0)
                    return copy.sort(function(contact1, contact2){
                       
                        var a           =   contact1.contactType == 'pending' ? 1 : 0,
                            b           =   contact2.contactType == 'pending' ? 1 : 0

                        return b-a
                    })
                }
    }
])