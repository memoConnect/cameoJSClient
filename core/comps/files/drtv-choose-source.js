'use strict';

// https://github.com/apache/cordova-plugin-camera/blob/b76b5ae670bdff4dd4c716e889ab12e049f9c733/doc/index.mdhttps://github.com/apache/cordova-plugin-camera/blob/b76b5ae670bdff4dd4c716e889ab12e049f9c733/doc/index.md

angular.module('cmFiles').directive('cmChooseSource', [
    'cmDevice', 'cmCamera', 'cmAnswerFiles',
    '$rootScope', '$document',
    function (cmDevice, cmCamera, cmAnswerFiles,
              $rootScope, $document) {

        return {
            restrict: 'E',
            templateUrl: 'comps/files/drtv-choose-source.html',
            scope: {
                cmOptions: '=cmOptions'
            },
            controller: function($scope){
                // option for drtv
                $scope.options = angular.extend({}, {
                    tooltip:'up', // up | down
                    useFrontCamera: false
                }, $scope.cmOptions || {});
            },

            link: function (scope, element) {
                // only for phonegap
                if (!cmDevice.isAndroid()) {
                    return false;
                }

                // source types
                scope.types = [
                    {icon:'cm-camera',i18n:'CAMERA'},
                    {icon:'cm-file',i18n:'FILE'}
                ];

                // watch for extern handler
                var kill_listener = $rootScope.$on('cmChooseSource:open', function(){
                    scope.toggleList('show',true);
                });

                // type handler
                scope.choosedType = function(type){
                    scope.toggleList('close');
                    switch(type.i18n.toLowerCase()){
                        case "camera":
                            cmCamera.takePhoto(function(blob){
                                cmAnswerFiles.set(blob);
                            },scope.options.useFrontCamera);
                        break;
                        case "file":
                            cmCamera.chooseFile(function(blob){
                                blob.useLocalUri = true;
                                cmAnswerFiles.set(blob);
                            });
                        break;
                    }
                };

                // click outside
                var body = angular.element($document[0].querySelector('body'));

                function findParent (tag_name, el) {
                    // loop up until parent element is found
                    while (el && el.nodeName.toLowerCase() !== tag_name) {
                        el = el.parentNode;
                    }
                    // return found element
                    return el;
                }

                function clickOutside(e){
                    if(e.target != element[0] && // target not emojilist
                        !findParent('cm-choose-source',e.target) // chooselist isnt parent
                     && !findParent('cm-files',e.target) // isnt handler
                        ) {
                        scope.toggleList('close',true);
                    }
                }

                scope.toggleList = function(action, withApply){
                    scope.showList = action && action == 'close'
                                  || action && action == 'show' && scope.showList
                                  || !action && scope.showList
                                  ? false : true;

                    if(scope.showList){
                        body.on('click',clickOutside);
                        body.on('touchstart',clickOutside);
                    } else {
                        body.off('click',clickOutside);
                        body.off('touchstart',clickOutside);
                    }

                    if(withApply != undefined && withApply)
                        scope.$apply();
                };

                scope.toggleList('close');

                scope.$on('$destroy',function(){
                    kill_listener();
                    body.off('click',clickOutside);
                    body.off('touchstart',clickOutside);
                });
            }
        }
    }]
);