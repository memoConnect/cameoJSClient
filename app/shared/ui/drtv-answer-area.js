'use strict';

angular.module('cmUi').directive('cmAnswerArea', [
    'cmUserModel',
    function (cmUserModel) {
        return {
            restrict : 'AE',
            link: function(scope, element){
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