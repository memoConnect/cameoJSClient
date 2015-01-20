'use strict';

angular.module('cmConversations')
    .directive('cmMessageFile', [
    'cmModal', 'cmUtil', 'cmFullscreen',
    function (cmModal, cmUtil, cmFullscreen) {
        return {
            restrict: 'E',
            require: '^cmMessage',
            templateUrl: 'comps/conversations/drtv-message-file.html',
            controller: function ($scope, $element) {
                $scope.cmUtil = cmUtil;
                $scope.progress = 0;

                // exists fileModel
                if(typeof $scope.file == 'object'){
                    $scope.file.on('progress:chunk', function(e, progress){
                        $scope.progress = progress;
                    });
                }
            }
        }
    }
]);