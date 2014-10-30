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

                function refresh(){
                    //cmLogger.debug('cmSecurityIndicator.refresh');

                    if($scope.conversation.securityAspects){
                        $scope.positive = $scope.conversation.securityAspects.getPositiveAspects().reduce(function(sum, aspect){ return sum+aspect.value } ,0);
                        $scope.negative = $scope.conversation.securityAspects.getNegativeAspects().reduce(function(sum, aspect){ return sum-aspect.value } ,0);
                        $scope.missing_aspects = false;
                    } else {
                        $scope.missing_aspects = true;
                    }

                    //console.log('$scope.conversation.recipients', $scope.conversation.recipients.length)
                    //console.log('aspects.length', $scope.conversation.securityAspects.aspects.length)
                    //console.log('aspects', $scope.positive, $scope.negative)

                    $scope.leading_icon = ($scope.positive >= $scope.negative)?'cm-lock':'cm-unlock';
                      
                }

                function refresh_callback(){
                    $scope.conversation.securityAspects.refresh();
                }

                if($scope.conversation){
                    $scope.conversation.securityAspects.on('refresh', refresh);
                    $scope.conversation.on('update:finished encryption:enabled encryption:disabled captcha:enabled captcha:disabled aspects:added', refresh_callback);
                    $scope.conversation.recipients.on('register update:finished deregister', refresh_callback);
                    cmUserModel.on('key:stored key:removed', refresh_callback);

                    $scope.conversation.securityAspects.refresh();


                    $scope.$on('$destroy', function(){
                        $scope.conversation.securityAspects.off('refresh', refresh);
                        $scope.conversation.off('update:finished encryption:enabled encryption:disabled captcha:enabled captcha:disabled aspects:added', refresh_callback);
                        $scope.conversation.recipients.off('register update:finished deregister', refresh_callback);
                        cmUserModel.off('key:stored key:removed', refresh_callback);
                    })

                } else {
                    cmLogger.debug('cmSecurityIndicator - Conversation not found!')
                }

            }
        }
    }
]);