'use strict';

angular.module('cmConversations').directive('cmMessageFile', [
    'cmFileFactory',
    'cmLogger',
    '$timeout',
    'cmJob',
    function (cmFileFactory, cmLogger, $timeout, cmJob) {
        return {
            restrict: 'E',
            require: '^cmMessage',
            templateUrl: 'comps/conversations/drtv-message-file.html',
            controller: function ($scope, $element, $attrs) {

                // exists fileModl
                if(typeof $scope.file == 'object'){

                    if($scope.file.state == 'new' && $scope.file.id == undefined){
                        // todo: upload
                        $scope.progress = 0;
                        $scope.file.uploadChunks().then(null, null, function(progress){
                            $scope.progress += progress
                        })
                    } else if($scope.file.state == 'new' && $scope.file.id != undefined){
                        // todo: download

                    }
                }

                $timeout(function(){
                    $scope.file.loaded = true;
//                    $scope.$apply();
                },1000)

                $scope.toggleJob = function(){
                    if(!cmJob.isActive())
                        cmJob.start('JOB.FILES_IN_UPLOAD_PROGRESS');
                    else
                        cmJob.stop();
                }
            }
        }
    }
])