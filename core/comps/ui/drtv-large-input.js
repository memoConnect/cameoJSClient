'use strict';

angular.module('cmUi').directive('cmLargeInput',[
    function(){
        return {
            restrict: 'A',

            link: function(scope, element, attrs){
                var outer_wrapper = angular.element('<div></div>').addClass('cm-form-group'),
                    inner_wrapper = angular.element('<div></div>').addClass('cm-form-control white-control with-inputter with-outside-icon'),
                    icon          = angular.element('<i></i>').addClass('fa').addClass(attrs.cmIcon)

                element.wrap(outer_wrapper)
                element.after(icon)
                element.wrap(inner_wrapper)
                element.attr('data-qa','input-search')
            }
        }
    }
]);