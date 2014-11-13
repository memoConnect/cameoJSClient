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
                        width           = element[0].offsetWidth,
                        children        = []

                    angular.forEach(element.children(), function(child){ 
                        children.push(angular.element(child))
                    })


                    //substract padding:
                    available_space -= 100*(element.css('paddingLeft')+element.css('paddingRight'))/width

                        //console.log(element.css('paddingRight'))

                    //substract children's margin:
                    children.forEach(function(child){  
                        available_space -= 100*(child.css('marginLeft')+child.css('marginRight'))/width    
                    })

                    //substract width of element width undefined weight:
                    children.forEach(function(child){                         
                        var weight = parseInt( child.attr('cm-weight')) || false

                        if(weight){
                            child.weight     =  weight
                            total_weight     += child.weight
                        }else{
                            available_space -= 100 * child[0].offsetWidth/width
                        }
                    });
                    
                    // stretch children according to their weight:
                    children.forEach(function (child) {
                        if (child.weight) {
                            child.css('width', (available_space * child.weight / total_weight) + '%')
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