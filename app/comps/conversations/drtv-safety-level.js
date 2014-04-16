'use strict';

angular.module('cmConversations').directive('cmSafetyLevel',[
    function cmSafetyLevel(){
        return {
            restrict: 'AE',
            template: '',

            link: function(scope, element, attrs){

                function draw(x){
                    element.children().remove()
                    for(var i = 0; i < x; i++){
                        element.append('<i class="fa cm-lock"></i>')
                    }
                    if(x == 0) element.append('<i class="fa cm-unlock"></i>')
                }

                scope.$watch(attrs.level, function(x){
                    draw(x)
                })
            }
        }
    }
])