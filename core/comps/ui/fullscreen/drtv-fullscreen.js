'use strict';

angular.module('cmUi')
.directive('cmFullscreen', [
    'cmModal', 'cmUtil', 'cmFullscreen', 'cmDevice',
    function (cmModal, cmUtil, cmFullscreen, cmDevice) {
        return {
            restrict: 'A',
            transclude: true,
            scope: true,
            template: '<div class="fullscreen-wrap" ng-class="{\'is-open\':isOpen}">'+
                        '<i class="fa cm-close" ng-click="closeFullscreen($event)"></i>'+
                        '<ng-transclude></ng-transclude>' +
                        '<figcaption>{{::caption}}</figcaption>'+
                      '</div>',
            controller: function ($scope, $element, $attrs) {

                $scope.isOpen = false;
                $scope.caption = '';
                $attrs.$observe('cmFullscreen',function(caption){
                    $scope.caption = caption;
                });

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
                    // html5 fullscreen
                    if(!cmDevice.isApp()) {
                        cmFullscreen.open($element[0]);
                        // for app the old fullscren modal
                    } else {
                        cmModal.create({
                            id: 'image-view',
                            'class': 'modal-image-fullscreen',
                            'type': 'fullscreen'
                        }, '<figure ng-style="fullscreenVisibility">' +
                        '<img cm-stay-in-viewport cm-src="fullscreenImage" cm-loaded-spinner="fullscreenSpinner" cm-loaded-visibility="fullscreenVisibility"  cm-pinch-and-pan="{initOnModalChange:true}" />' +
                        '<figcaption><cm-message-assets></cm-message-assets></figcaption>' +
                        '</figure>' +
                        '<cm-footer><i class="fa cm-grid"></i></cm-footer>', null, $scope);
                        cmModal.open('image-view');

                        $scope.fullscreenSpinner = true;
                        $scope.fullscreenVisibility = {visibility:'hidden'};
                        $scope.fullscreenImage = $element.find('img').attr('src');
                    }
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