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
                        $scope.conversation.messages[(i-1)].decryptFiles($scope.conversation.passphrase);
                        i--;
                    }
                }

                if($scope.$last){
                    loadFiles();
                }
            }
        }
    }
]);