'use strict';

angular.module('cmUser').directive('cmUserRights', [
    'cmUserModel',
    'cmEnv',
    function (cmUserModel, cmEnv) {
        return {
            restrict : 'AE',
            link: function(scope, element, attrs){
                function removeElement(){
                    if(cmUserModel.isGuest() !== false){
                        element.remove();
                    }
                }

                cmUserModel.on('init',function(){
                    removeElement();
                })

                removeElement();
            }
        }
    }
]);