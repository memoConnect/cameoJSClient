'use strict';

angular.module('cmUser').directive('cmUserRights', [
    'cmUserModel',
    'cmEnv',
    function (cmUserModel, cmEnv) {
        return {
            restrict : 'AE',
            link: function(scope, element, attrs){
                if(cmUserModel.isGuest() !== false){
                    element.remove();
                }
            }
        }
    }
]);