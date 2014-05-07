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
            controller: function ($scope) {
                $scope.progress = 0;

                $scope.cmFileTypes = cmFileTypes;

                $scope.isImage = function(mime){
                    return mime == undefined ? false : mime.search('^image/') != -1;
                };

                // exists fileModel
                if(typeof $scope.file == 'object'){

                    if($scope.file.state == 'exists'){
                        $scope.file
                            .setPassphrase($scope.conversation.passphrase)
                    }

                    $scope.file.on('progress:chunk', function(progress){
                        $scope.progress += progress;
                    });

                    $scope.file.on('download:finish', function(){
                        $scope.progress = 1;
                        $scope.file
                            .decryptName()
                            .decryptChunks();
                    });
                }
            }
        }
    }
])