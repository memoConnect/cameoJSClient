'use strict';

angular.module('cmDesktopConversations').directive('cmAnswer',[
    'cmDevice', 'cmAnswerFiles',
    '$rootScope',
    function (cmDevice, cmAnswerFiles,
              $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'comps/conversations/drtv-answer.html',
            link: function (scope, element) {
                if(cmDevice.isDesktop('cmAnswer'))
                    element.find('textarea')[0].focus();

                scope.isFullscreen = false;
                scope.toogleFullscreen = function(forceClose){
                    if(forceClose || !forceClose && scope.isFullscreen){
                        element.removeClass('in-fullscreen');
                    } else {
                        element.addClass('in-fullscreen');
                    }

                    scope.isFullscreen = forceClose || !forceClose && scope.isFullscreen ? false : true;
                }
            },
            controller: function($scope){
                $scope.files = cmAnswerFiles.files;

                function callback_files_resetted(){
                    $scope.files = cmAnswerFiles.files;
                }

                cmAnswerFiles.on('files:resetted', callback_files_resetted);

                var watcher = $rootScope.$on('cmAnswer:reset',function(){
                    $scope.toogleFullscreen(true);
                });

                $scope.$on('$destroy', function(){
                    cmAnswerFiles.off('files:resetted', callback_files_resetted);
                    watcher();
                });
            }
        }
    }
]);