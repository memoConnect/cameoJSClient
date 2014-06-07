'use strict';

angular.module('cmSecurityAspects')
.directive('cmSecurityAspect',[

    //no dependencies

    function cmSecurityAspect(){
        return {
            restrict:   'AE',
            template:    '<cm-icons count="{{count}}" icons="cm-checkbox-add"    class="{{class}}"></cm-icons>'
                        +'<div class="name">        {{"SECURITY_ASPECT.CONVERSATION."+aspect.id+".NAME"|cmTranslate}}           </div>'
                        +'<div class="description"> {{"SECURITY_ASPECT.CONVERSATION."+aspect.id+".DESCRIPTION"|cmTranslate}}    </div>',
            scope:      {
                            aspect:'=cmData'
                        },

            link:       function(scope, element, attrs){
                            if(scope.aspect.value < 0)
                                scope.class = 'negative'

                            if(scope.aspect.value == 0)
                                scope.class = 'neutral' 

                            if(scope.aspect.value > 0)
                                scope.class = 'positive'

                            element.addClass(scope.class)

                            scope.count = Math.abs(scope.aspect.value)

                        }
        }
    }
])