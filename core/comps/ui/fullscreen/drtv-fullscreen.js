'use strict';

angular.module('cmUi')
.directive('cmFullscreen', [
    'cmModal', 'cmUtil', 'cmFullscreen',
    function (cmModal, cmUtil, cmFullscreen) {
        return {
            restrict: 'A',
            transclude: true,
            template: '<div class="fullscreen-wrap" ng-class="{\'is-open\':isOpen}">'+
                        '<i class="fa cm-close" ng-click="closeFullscreen($event)"></i>'+
                        '<ng-transclude></ng-transclude>' +
                      '</div>',
            controller: function ($scope, $element) {

                $scope.isOpen = false;

                function isOpen(event, data){
                    if($element[0] != data.element)
                        return false;

                    $scope.$apply(function(){
                        $scope.isOpen = data.isOpen;
                    });
                }

                cmFullscreen.on('change',isOpen);

                $scope.closeFullscreen = function($event){
                    cmFullscreen.close();
                    $event.stopPropagation();
                };

                function openFullscreen(){

                    cmFullscreen.open($element[0]);

                    return false;

                    //// old way for fullscreen open modal
                    //cmModal.create({
                    //    id: 'image-view',
                    //    'class': 'modal-image-fullscreen',
                    //    'type': 'fullscreen'
                    //}, '<figure ng-style="fullscreenVisibility">' +
                    //'<img cm-stay-in-viewport cm-src="fullscreenImage" cm-loaded-spinner="fullscreenSpinner" cm-loaded-visibility="fullscreenVisibility" />' +
                    //'<figcaption><cm-message-assets></cm-message-assets></figcaption>' +
                    //'</figure>' +
                    //'<cm-footer><i class="fa cm-grid"></i></cm-footer>', null, $scope);
                    //cmModal.open('image-view');
                    //
                    //$scope.fullscreenSpinner = true;
                    //$scope.fullscreenVisibility = {visibility:'hidden'};
                    //$scope.fullscreenImage = $element.find('img').attr('src');
                }

                $element.on('click', openFullscreen);

                $scope.$on('$destroy', function(){
                    $element.off('click', openFullscreen);
                    cmFullscreen.off('change',isOpen);
                });
            }
        }
    }
]);