'use strict';

angular.module('cmConversations').directive('cmLastMessage', [
    'cmLogger',
    function (cmLogger) {
        return {
            restrict: 'A',
            controller: function ($scope) {
                /**
                 * Load Files in Messages from Server
                 */
                function loadFiles() {
                    var i = $scope.conversation.messages.length;
                    while(i > 0){
                        var files = $scope.conversation.messages[(i-1)].files;

                        angular.forEach(files, function(file){
                                file.setPassphrase($scope.conversation.passphrase);
                                file.downloadStart();
                        });

                        i--;
                    }
                }

                if($scope.$last){
                    loadFiles();
                }
            }
        }
    }
])