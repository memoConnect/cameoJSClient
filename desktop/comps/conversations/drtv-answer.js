'use strict';

angular.module('cmDesktopConversations').directive('cmAnswer',[
    'cmDevice', 'cmAnswerFiles',
    function (cmDevice, cmAnswerFiles){
        return {
            restrict: 'E',
            templateUrl: 'comps/conversations/drtv-answer.html',
            link: function (scope, element) {
                if(cmDevice.isDesktop('cmAnswer'))
                    element.find('textarea')[0].focus();
            },
            controller: function($scope){
                $scope.files = cmAnswerFiles.files;

                function callback_files_resetted(){
                    $scope.files = cmAnswerFiles.files;
                }

                cmAnswerFiles.on('files:resetted', callback_files_resetted);

                $scope.$on('$destroy', function(){
                    cmAnswerFiles.off('files:resetted', callback_files_resetted);
                });
            }
        }
    }
]);