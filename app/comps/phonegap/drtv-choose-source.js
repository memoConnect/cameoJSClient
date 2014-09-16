'use strict';

// https://github.com/apache/cordova-plugin-camera/blob/b76b5ae670bdff4dd4c716e889ab12e049f9c733/doc/index.mdhttps://github.com/apache/cordova-plugin-camera/blob/b76b5ae670bdff4dd4c716e889ab12e049f9c733/doc/index.md

angular.module('cmPhonegap').directive('cmChooseSource', [
    'cmDevice', 'cmCamera',
    '$rootScope', '$document',
    function (cmDevice, cmCamera,
              $rootScope, $document) {

        return {
            restrict: 'E',
            require: '^cmFiles',
            template: '<div class="wrapper" ng-show="showList">'+
                        '<div class="source" ng-repeat="type in types" ng-click="choosedType(type)">' +
                            '<i class="fa {{type.icon}}"></i>{{\'DRTV.CHOOSE_SOURCE.\'+type.i18n|cmTranslate}}' +
                        '</div>'+
                        '<i class="fa cm-nose-down flip"></i>'+
                      '</div>',

            link: function (scope, element, attrs, cmFilesCtrl) {
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
                $rootScope.$on('cmChooseSource:open', function(){
                    scope.toggleList('show',true);
                });

                // type handler
                scope.choosedType = function(type){
                    scope.toggleList('close');
                    switch(type.i18n.toLowerCase()){
                        case "camera":
                            cmCamera.takePhoto(function(blob){
                                cmFilesCtrl.setFile(blob);
                            });
                        break;
                        case "file":
                            cmCamera.chooseFile(function(blob){
                                blob.useLocalUri = true;
                                cmFilesCtrl.setFile(blob);
                            });
                        break;
                    }
                };

                // click outside
                var body = angular.element($document[0].querySelector('body'));

                function findParent (tag_name, el) {
                    // loop up until parent element is found
                    while (el && el.nodeName !== tag_name) {
                        el = el.parentNode;
                    }
                    // return found element
                    return el;
                }

                function clickOutside(e){
                    if(e.target != element[0] && // target not emojilist
                        !findParent('CM-CHOOSE-SOURCE',e.target) && // chooselist isnt parent
                        !findParent('CM-FILES',e.target) // isnt handler
                        ) {
                        scope.toggleList('close',true);
                    }
                }

                scope.toggleList = function(action, withApply){
                    scope.showList = action != undefined && action == 'close' || action == undefined && scope.showList ? false : true;

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
            }
        }
    }]
);