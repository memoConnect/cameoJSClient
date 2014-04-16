'use strict';

angular.module('cmContacts').directive('cmKeyLevel',[
    function (){
        return {
            restrict: 'AE',
            template: '',

            link: function(scope, element, attrs){

                function draw(x){
                    element.children().remove()
                    for(var i = 0; i < x; i++){
                        element.append('<i class="fa cm-key"></i>')
                    }
                    if(x == 0) element.append('<i class="fa cm-close"></i>')
                }

                /* dont watch, neither level nor key-size should change dynamically

                 scope.$watch(attrs.level, function(x){
                 if(x != undefined) draw(x)
                 })

                 scope.$watch(attrs.keySize, function(key_size){
                 if(key_size != undefined){
                 draw(Math.floor((key_size+1)/2048))
                 }
                 })
                 */

                var number = attrs.level || Math.floor((attrs.keySize + 1)/2048) || 0
                draw(number)
            }
        }
    }
]);