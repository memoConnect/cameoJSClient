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

                if($scope.conversation){
                    $scope.conversation.securityAspects.on('refresh', refresh);


                    $scope.conversation.on('update:finished encryption:enabled encryption:disabled captcha:enabled captcha:disabled aspects:added', function () {
                        $scope.conversation.securityAspects.refresh();
                    });

                    $scope.conversation.recipients.on('register update:finished deregister', function(){
                        $scope.conversation.securityAspects.refresh();
                    });

                    cmUserModel.on('key:stored key:removed', function(){
                        $scope.conversation.securityAspects.refresh();
                    });

                    $scope.conversation.securityAspects.refresh();
                } else {
                    cmLogger.debug('cmSecurityIndicator - Conversation not found!')
                }



                //$scope.$watchCollection($attrs.cmData, function(security_aspects){
                //    if(security_aspects){
                //        $scope.positive = security_aspects.getPositiveAspects().reduce(function(sum, aspect){ return sum+aspect.value } ,0)
                //        $scope.negative = security_aspects.getNegativeAspects().reduce(function(sum, aspect){ return sum-aspect.value } ,0)
                //        $scope.missing_aspects = false
                //    } else {
                //        $scope.missing_aspects = true
                //    }
                //
                //    $scope.leading_icon = ($scope.positive >= $scope.negative)?'cm-lock':'cm-unlock';
                //});
            }
        }
    }
]);