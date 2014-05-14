'use strict';

angular.module('cmConversations').directive('cmMessageFile', [
    'cmFileFactory',
    'cmLogger',
    '$timeout',
    'cmJob',
    'cmFileTypes',
    'cmModal',
    function (cmFileFactory, cmLogger, $timeout, cmJob, cmFileTypes, cmModal) {
        return {
            restrict: 'E',
            require: '^cmMessage',
            templateUrl: 'comps/conversations/drtv-message-file.html',
            controller: function ($scope, $element) {
                $scope.progress = 0;

                $scope.cmFileTypes = cmFileTypes;

                $scope.isImage = function(mime){
                    return mime == undefined ? false : mime.search('^image/') != -1;
                };

                $scope.showFullscreen = function(){
                    // open modal
                    cmModal.create({
                        id: 'image-view',
                        'class': 'modal-image-fullscreen',
                        'type': 'fullscreen'
                    }, '<img src="'+$element.find('img').attr('src')+'" cm-stay-in-viewport /><cm-message-assets></cm-message-assets>', null, $scope);
                    cmModal.open('image-view');
                };

                // exists fileModel
                if(typeof $scope.file == 'object'){
                    $scope.file.on('progress:chunk', function(e, progress){
                        $scope.progress = progress;
                    });
                }
            }
        }
    }
])