'use strict';

angular.module('cmUi').directive('cmRubberSpace',[
    function (){
        return {
            restrict : 'AE',
            priority: 1,

            link : function(scope, element, attrs, controller){
                var total_weight    = 0,
                    available_space = 100
                width           = element[0].offsetWidth

                //remove text nodes:
                angular.forEach(element[0].childNodes, function(el){
                    if(el.nodeType != 1) element[0].removeChild(el)
                })

                //calculate total weight:
                angular.forEach(element.children(), function(child){
                    var weight = parseInt( angular.element(child).attr('cm-weight')) || false

                    if(weight){
                        child.weight     = weight
                        total_weight    += child.weight
                    }else{
                        available_space -= 100 * child.offsetWidth/width
                    }

                })

                //stretch children according to their weight:
                function tighten(){
                    angular.forEach(element.children(), function(child){
                        child = angular.element(child)

                        if(child[0].weight){
                            child.css('width', (available_space*child[0].weight/total_weight)+'%')
                        }

                    })
                }

                tighten()

            }
        }
    }
]);