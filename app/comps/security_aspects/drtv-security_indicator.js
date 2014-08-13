'use strict';

angular.module('cmSecurityAspects').directive('cmSecurityIndicator',[
    function(){
        return {
            restrict:   'AE',
            templateUrl:'comps/security_aspects/drtv-security_indicator.html',    
            scope:      true,

            controller: function($scope, $element, $attrs){
                $scope.missing_aspects  = true;
                $scope.leading_icon     = 'cm-lock';
                
                $scope.$watchCollection($attrs.cmData, function(security_aspects){
                    if(security_aspects){
                        $scope.positive = security_aspects.getPositiveAspects().reduce(function(sum, aspect){ return sum+aspect.value } ,0)
                        $scope.negative = security_aspects.getNegativeAspects().reduce(function(sum, aspect){ return sum-aspect.value } ,0)
                        $scope.missing_aspects = false                        
                    } else {
                        $scope.missing_aspects = true
                    }

                    $scope.leading_icon = ($scope.positive >= $scope.negative)?'cm-lock':'cm-unlock';
                });
            }
        }
    }
]);