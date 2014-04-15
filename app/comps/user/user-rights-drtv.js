'use strict';

function cmUserRights(cmUserModel, cmEnv) {
    return {
        restrict : 'AE',
       link: function(scope, element, attrs){
           if(cmUserModel.isGuest() !== false){
               element.remove();
           }
       }
    }
}