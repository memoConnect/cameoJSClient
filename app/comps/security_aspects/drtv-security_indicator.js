'use strict';

angular.module('cmSecurityAspects').directive('cmSecurityIndicator',[

    //no dependencies

    function cmSecurityIndicator(){
        return {
            restrict:   'AE',
            template:    '<cm-icons count="{{positive}}" icons="cm-checkbox-add"    class="positive"></cm-icons>'
                        +'<cm-icons count="{{negative}}" icons="cm-checkbox-wrong"  class="negative"></cm-icons>'
                        +'<span ng-if="missing_aspects">{{"SECURITY_ASPECTS.ERROR.MISSING_DATA" |cmTranslate}}</span>',
            scope:      true,

            controller: function($scope, $element, $attrs){
                $scope.missing_aspects = true
                
                $scope.$watchCollection($attrs.cmData, function(security_aspects){
                    if(security_aspects){
                        $scope.positive = security_aspects.getPositiveAspects().reduce(function(sum, aspect){ return sum+aspect.value } ,0)
                        $scope.negative = security_aspects.getNegativeAspects().reduce(function(sum, aspect){ return sum-aspect.value } ,0)
                        $scope.missing_aspects = false                        
                    }else{
                        $scope.missing_aspects = true
                    }
                })

            }
        }
    }
])