'use strict';

angular.module('cmConversations').directive('cmMessageFile', [
    'cmModal', 'cmUtil',
    function (cmModal, cmUtil) {
        return {
            restrict: 'E',
            require: '^cmMessage',
            templateUrl: 'comps/conversations/drtv-message-file.html',
            controller: function ($scope, $element) {
                $scope.cmUtil = cmUtil;
                $scope.progress = 0;

                $scope.showFullscreen = function(){
                    // open modal
                    cmModal.create({
                        id: 'image-view',
                        'class': 'modal-image-fullscreen',
                        'type': 'fullscreen'
                    }, '<figure ng-style="fullscreenVisibility">' +
                        '<img cm-stay-in-viewport cm-src="fullscreenImage" cm-loaded-spinner="fullscreenSpinner" cm-loaded-visibility="fullscreenVisibility" />' +
                        '<figcaption><cm-message-assets></cm-message-assets></figcaption>' +
                       '</figure>' +
                       '<cm-footer><i class="fa cm-grid"></i></cm-footer>', null, $scope);
                    cmModal.open('image-view');

                    $scope.fullscreenSpinner = true;
                    $scope.fullscreenVisibility = {visibility:'hidden'};
                    $scope.fullscreenImage = $element.find('img').attr('src');
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