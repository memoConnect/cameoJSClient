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

                // exists fileModel
                if(typeof $scope.file == 'object'){

                    if($scope.file.state == 'new'){
                        // todo: upload
                        $scope.progress = 0;
                        $scope.file.uploadChunks().then(null, null, function(progress){
                            $scope.progress += progress
                        }).then(function(){
                            $scope.file.state = 'cached';
                        })
                    } else if($scope.file.state == 'exists'){
                        // todo: download
                        $scope.progress = 0;
                        $scope.file.importByFileId().then(function() {
                            $scope.file.downloadChunks().then(null, null, function (progress) {
                                $scope.progress += progress
                            }).then(function () {
                                $scope.file.state = 'cached';
                            })
                        })
                    }
                }

//                $timeout(function(){
//                    $scope.file.loaded = true;
////                    $scope.$apply();
//                },1000)
            }
        }
    }
])