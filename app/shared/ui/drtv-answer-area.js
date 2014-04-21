'use strict';

angular.module('cmUi').directive('cmAnswerArea', [
    'cmUserModel',
    'cmEnv',
    function (cmUserModel, cmEnv) {
        return {
            restrict : 'AE',
            link: function(scope, element, attrs){
                function addClass(){
                    if(cmUserModel.isGuest() !== false){
                        element.addClass('large');
                    }
                }

                cmUserModel.on('init',function(){
                    addClass();
                })

                addClass();
            }
        }
    }
]);