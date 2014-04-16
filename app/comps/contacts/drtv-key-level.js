'use strict';

angular.module('cmContacts').directive('cmKeyLevel',[
    function (){
        return {
            restrict: 'AE',
            template: '',

            link: function(scope, element, attrs){

                function draw(x){
                    for(var i = 0; i < x; i++){
                        element.append('<i class="fa cm-key"></i>')
                    }
                    if(x == 0) element.append('<i class="fa cm-unlock"></i>')
                }

                scope.$watch(attrs.level, function(x){
                    draw(x)
                })

                scope.$watch(attrs.keySize, function(key_size){
                    key_size = key_size - 1
                    draw(Math.floor(key_size/2048))
                })
            }
        }
    }
]);