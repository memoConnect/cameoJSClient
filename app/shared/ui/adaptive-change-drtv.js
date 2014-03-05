function cmAdaptiveChange() {
    return {
        restrict:       'A',
        require:        'ngModel',
        scope:          false,

        link:           function(scope, element, attrs, ngModelCtrl){
            //inputs with this directive will not update the scope on simple keydown-events
            var timeout;

            element
                .unbind('input')
                .unbind('keydown')
                .on('keydown', function(){
                    window.clearTimeout(timeout)

                    timeout = window.setTimeout(function(){                            
                        scope.$apply(function() {
                            ngModelCtrl.$setViewValue(element.val())                                
                        })
                    },500)
                })
        }

    }
}