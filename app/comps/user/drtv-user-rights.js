'use strict';

angular.module('cmUser').directive('cmUserRights', [
    'cmUserModel',
    'cmEnv',
    function (cmUserModel, cmEnv) {
        return {
            restrict : 'AE',
            link: function(scope, element, attrs){
                console.log((attrs['cmUserRights'] == 'showForGuest' && cmUserModel.isGuest() === false))
                function removeElement(){
                    // remove for guest
                    if(cmUserModel.isGuest() !== false && attrs['cmUserRights'] == ''){
                        element.remove();
                    // remove for logged user
                    } else if(attrs['cmUserRights'] == 'showForGuest' && cmUserModel.isGuest() === false) {
                        element.remove();
                    }
                }

                cmUserModel.on('update:finished',function(){
                    removeElement();
                });

                removeElement();
            }
        }
    }
]);