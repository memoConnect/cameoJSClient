'use strict';

angular.module('cmSecurityAspects').directive('cmSecurityIndicator',[
    'cmUserModel', 'cmLogger',
    '$timeout',
    function(cmUserModel, cmLogger,
             $timeout){
        return {
            restrict:   'E',
            templateUrl:'comps/security_aspects/drtv-security_indicator.html',
            scope: {
                conversation: '=cmData'
            },
            controller: function($scope, $element, $attrs){
                $scope.missing_aspects  = true;
                $scope.leading_icon     = 'cm-lock';
                $scope.checking         = true;

                function refreshScope(){
                    //cmLogger.debug('cmSecurityIndicator.refresh');
                    
                    $scope.checking = true

                    $scope.conversation.securityAspects
                    .get()
                    .then(function(){
                        $scope.positive         = $scope.conversation.securityAspects.getPositiveAspects().reduce(function(sum, aspect){ return sum+aspect.value } ,0);
                        $scope.negative         = $scope.conversation.securityAspects.getNegativeAspects().reduce(function(sum, aspect){ return sum-aspect.value } ,0);
                        $scope.missing_aspects  = false;
                        $scope.checking         = false;
                        $scope.leading_icon     = ($scope.positive >= $scope.negative) ? 'cm-lock' : 'cm-unlock';
                    })

                    //console.log('$scope.conversation.recipients', $scope.conversation.recipients.length)
                    //console.log('aspects.length', $scope.conversation.securityAspects.aspects.length)
                    //console.log('aspects', $scope.positive, $scope.negative)

                }

                function check(){ $scope.checking = true }

                if($scope.conversation){
                    refreshScope()
                    $scope.conversation.securityAspects.on('schedule', check);
                    $scope.conversation.securityAspects.on('refresh', refreshScope);
                    

                    $scope.$on('$destroy', function(){
                        $scope.conversation.securityAspects.off('schedule', check);
                        $scope.conversation.securityAspects.off('refresh', refreshScope)
                    })

                } else {
                    cmLogger.debug('cmSecurityIndicator - Conversation not found!')
                }

            }
        }
    }
]);