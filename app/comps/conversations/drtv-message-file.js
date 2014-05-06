'use strict';

angular.module('cmConversations').directive('cmMessageFile', [
    'cmFileFactory',
    'cmLogger',
    '$timeout',
    'cmJob',
    'cmFileTypes',
    function (cmFileFactory, cmLogger, $timeout, cmJob, cmFileTypes) {
        return {
            restrict: 'E',
            require: '^cmMessage',
            templateUrl: 'comps/conversations/drtv-message-file.html',
            controller: function ($scope, $element, $attrs) {
                $scope.progress = 0;

                $scope.cmFileTypes = cmFileTypes;

                $scope.isImage = function(mime){
                    return mime == undefined ? false : mime.search('^image/') != -1;
                };

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

                            $scope.file.decryptName($scope.conversation.passphrase)

                            $scope.file.downloadChunks()
                            .then(
                                function(){
                                    $scope.file.decryptChunks($scope.conversation.passphrase)
                                },
                                null,
                                function (progress) {
                                    $scope.progress += progress
                                })
                            .then(function () {
                                $scope.file.state = 'cached';
                                $scope.file.reassembleChunks()
                            })
                        })
                    }


                    $scope.file.on('upload:chunk', function(progress){
                        $scope.progress += progress;
                    });

                    $scope.file.on('upload:finish', function(){
                        $scope.file.state = 'cached';
                    });

                    $scope.file.on('download:chunk', function(progress){
                        $scope.progress += progress;
                    });

                    $scope.file.on('download:finish', function(){
                        $scope.file.state = 'cached';
                    });
                }
            }
        }
    }
])