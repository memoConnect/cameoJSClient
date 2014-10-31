angular.module('cmWidgets').service('cmWidget',[
    function(){
        this.setup = function(scope, element, attrs){
            element.addClass('widget')
        }
    }
])