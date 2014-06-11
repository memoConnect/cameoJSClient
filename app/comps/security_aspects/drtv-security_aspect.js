'use strict';

angular.module('cmSecurityAspects')
.directive('cmSecurityAspect',[

    //no dependencies

    function cmSecurityAspect(){
        return {
            restrict:       'AE',
            templateUrl:    'comps/security_aspects/drtv-security_aspect.html',
            scope:          {
                                aspect:'=cmData'
                            },

            link:       function(scope, element, attrs){
                            if(scope.aspect.value < 0){
                                scope.class = 'negative'
                                scope.icons = 'cm-checkbox-minus'
                            }

                            if(scope.aspect.value == 0)
                                scope.class = 'neutral' 

                            if(scope.aspect.value > 0){
                                scope.class = 'positive'
                                scope.icons = 'cm-checkbox-add'
                            }

                            element.addClass(scope.class)

                            scope.count = Math.abs(scope.aspect.value)

                        }
        }
    }
])