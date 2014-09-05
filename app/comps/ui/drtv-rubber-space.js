'use strict';

angular.module('cmUi').directive('cmRubberSpace',[
    '$rootScope',
    function ($rootScope){
        return {
            restrict : 'A',
            link : function(scope, element, attrs) {
                

                // remove text nodes:
                angular.forEach(element[0].childNodes, function (el) {
                    if(el.nodeType == 3) {//nodeType === 8 is <!-- -->
                        angular.element(el).remove();
                    }
                });

                function tighten(){
                    // calculate total weight:
                    var available_space = 100,
                        total_weight    = 0,
                        width           = element[0].offsetWidth

                    //substract padding:
                    available_space -= 100*(element.css('paddingLeft')+element.css('paddingRight'))/width

                        //console.log(element.css('paddingRight'))

                    //substract children's margin:
                    angular.forEach(element.children(), function(child){  
                        available_space -= 100*(angular.element(child).css('marginLeft')+angular.element(child).css('marginRight'))/width    
                    })

                    //substract width of element width undefined weight:
                    angular.forEach(element.children(), function(child){                         
                        var weight = parseInt( angular.element(child).attr('cm-weight')) || false


                        if(weight){
                            child.weight     = weight
                            total_weight    += child.weight
                        }else{
                            available_space -= 100 * child.offsetWidth/width
                        }
                    });
                    
                    // stretch children according to their weight:
                    angular.forEach(element.children(), function (child) {
                        child = angular.element(child)

                        if (child[0].weight) {
                            child.css('width', (available_space * child[0].weight / total_weight) + '%')
                        }
                    })

                }

                scope.$watch(function(){
                    tighten();
                })

                $rootScope.$on('rubberSpace:tighten',function(){
                    tighten();
                });
            }
        }
    }
]);