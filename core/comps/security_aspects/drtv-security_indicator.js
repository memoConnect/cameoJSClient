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

                    if($scope.conversation.securityAspects){
                        $scope.conversation.securityAspects
                        .get()
                        .then(function(){
                            $scope.positive         = $scope.conversation.securityAspects.getPositiveAspects().reduce(function(sum, aspect){ return sum+aspect.value } ,0);
                            $scope.negative         = $scope.conversation.securityAspects.getNegativeAspects().reduce(function(sum, aspect){ return sum-aspect.value } ,0);
                            $scope.missing_aspects  = false;
                            $scope.checking         = false;
                            $scope.leading_icon     = ($scope.positive >= $scope.negative) ? 'cm-lock' : 'cm-unlock';
                        })
                    } else {
                        $scope.missing_aspects  = true;
                        $scope.checking         = false;
                    }

                    //console.log('$scope.conversation.recipients', $scope.conversation.recipients.length)
                    //console.log('aspects.length', $scope.conversation.securityAspects.aspects.length)
                    //console.log('aspects', $scope.positive, $scope.negative)

                }

                var refresh_scheduled = false

                function schedule_refresh(){
                    $scope.checking = true

                    //prevent more than 1 refresh call per second
                    if(!refresh_scheduled){
                        refresh_scheduled = true
                        $timeout(function(){
                            $scope.conversation.securityAspects.refresh();
                        }, 400)
                        .then(function(){
                            refresh_scheduled = false
                        })
                    } 
                }

                if($scope.conversation){
                    refreshScope() //refreshScope()


                    $scope.conversation.securityAspects.on('refresh', refreshScope);
                    $scope.conversation.on('update:finished encryption:enabled encryption:disabled captcha:enabled captcha:disabled aspects:added', schedule_refresh);
                    $scope.conversation.recipients.on('register update:finished deregister', schedule_refresh);
                    cmUserModel.on('key:stored key:removed cache:updated', schedule_refresh);

                    $scope.$on('$destroy', function(){
                        $scope.conversation.securityAspects.off('refresh', refreshScope);
                        $scope.conversation.off('update:finished encryption:enabled encryption:disabled captcha:enabled captcha:disabled aspects:added', schedule_refresh);
                        $scope.conversation.recipients.off('register update:finished deregister', schedule_refresh);
                        cmUserModel.off('key:stored key:removed', schedule_refresh);
                    })

                } else {
                    cmLogger.debug('cmSecurityIndicator - Conversation not found!')
                }

            }
        }
    }
]);