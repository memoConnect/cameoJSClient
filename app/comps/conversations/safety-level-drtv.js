function cmSafetyLevel(){
    return {
        restrict : 'AE',

        link : function(scope, element, attrs){

            function draw(x){
                element.children().remove()
                for(var i = 0; i < x; i++){
                    element.append('<i class="fa cm-lock"></i>')
                }
            }

            scope.$watch(attrs.level, function(x){
                draw(x)
            })
        }
    }
}