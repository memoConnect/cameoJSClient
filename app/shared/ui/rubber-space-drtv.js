function cmRubberSpace(){
    return {
        restrict : 'AE',
        priority: 100000,

        link : function(scope, element, attrs, controller){
            var total_weight = 0


            //remove text nodes:
            angular.forEach(element[0].childNodes, function(el){
                if(el.nodeType != 1) element[0].removeChild(el)                
            })

            //calculate total weight:
            angular.forEach(element.children(), function(child){           
                total_weight += parseInt(angular.element(child).attr('cm-weight') || 1)            
            })

            //stretch children according to their weight:
            function tighten(){
                angular.forEach(element.children(), function(child){
                    child = angular.element(child)
                    child.css({
                        'width'     : (100*parseInt(child.attr('cm-weight') || 1)/total_weight)+'%',
                        'display'   : 'inline-block',
                        'min-height' : '1px'                        
                    })
                })
            }

            element.css({
                'display'    : 'block',
                'text-align' : 'center'
            })
            tighten()

        },
    }
}