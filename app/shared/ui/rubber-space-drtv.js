function cmRubberSpace(){
    return {
        restrict : 'AE',
        priority: 0,

        link : function(scope, element, attrs, controller){
            var total_weight    = 0,
                available_space = 100
                height          = element[0].clientHeight
                width           = element[0].clientWidth
                unit            = 100*height/width


            //remove text nodes:
            angular.forEach(element[0].childNodes, function(el){
                if(el.nodeType != 1) element[0].removeChild(el)               

            })

            //calculate total weight:
            angular.forEach(element.children(), function(child){
                var weight = angular.element(child).attr('cm-weight') || ''
                    units  = angular.element(child).attr('cm-units') || '' 

                if(!units){
                    child.weight     = parseInt( weight ) || 1
                    total_weight    += child.weight
                }else{
                    child.units      = parseInt( units ) || 1
                    available_space -= child.units*unit
                }

            })

            //stretch children according to their weight:
            function tighten(){
                console.log(total_weight)
                angular.forEach(element.children(), function(child){
                    child = angular.element(child)

                    if(child[0].weight) child.css('width', (available_space*child[0].weight/total_weight)+'%')
                    if(child[0].units)  child.css('width', parseFloat( child[0].units )*unit+'%')

                })
            }

            tighten()

        },
    }
}